input.onButtonPressed(Button.A, function () {
    hour += 1
    if (hour > 24) {
        hour = 0
    }
    RTC_DS1307.setTime(RTC_DS1307.TimeType.HOUR, hour)
})
input.onButtonPressed(Button.AB, function () {
    basic.showString(GetTimeString())
})

input.onButtonPressed(Button.B, function () {
    minute += 1
    if (minute > 60) {
        minute = 0
    }
    RTC_DS1307.setTime(RTC_DS1307.TimeType.MINUTE, minute)
})
let second = 0
let modulus = 0
let minute = 0
let hour = 0
sevenSegment.startSevenSegPin0()

function GetTimeString() : string
{
    hour = RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR)
    minute = RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE)
    second = RTC_DS1307.getTime(RTC_DS1307.TimeType.SECOND)

    let timeText = ""
    if (hour < 10) {
        timeText = timeText + "0"
    }
    timeText =  timeText + hour.toString()
    if (minute < 10) {
        timeText = timeText + "0"
    }
    timeText = timeText + minute.toString()
    modulus = second % 5
    if (modulus > 0) {
        timeText = timeText.substr(0, modulus) + "." + timeText.substr(modulus)
    }
    return timeText
}

basic.forever(function () {
    sevenSegment.writeString(GetTimeString())
    basic.pause(1000)
})

function INFERMIERA () {
    Infermiera_do += 1
    music.play(music.stringPlayable("G B A G C5 B A B ", 200), music.PlaybackMode.LoopingInBackground)
    servos.P1.setAngle(180)
}
function LED_ATTENZIONE () {
    strip.setPixelColor(8, neopixel.colors(NeoPixelColors.Red))
    strip.show()
}
pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    strip.clear()
    strip2.clear()
    strip3.clear()
    strip4.clear()
    music.stopAllSounds()
    servos.P1.setAngle(0)
})
let Infermiera_do = 0
let strip4: neopixel.Strip = null
let strip3: neopixel.Strip = null
let strip2: neopixel.Strip = null
let strip: neopixel.Strip = null
let buffer: Buffer = null
let RESET = 0
serial.redirect(
SerialPin.P2,
SerialPin.P0,
BaudRate.BaudRate9600
)
music.setVolume(255)
strip = neopixel.create(DigitalPin.P13, 8, NeoPixelMode.RGB)
strip2 = neopixel.create(DigitalPin.P14, 7, NeoPixelMode.RGB)
strip3 = neopixel.create(DigitalPin.P15, 7, NeoPixelMode.RGB)
strip4 = neopixel.create(DigitalPin.P16, 7, NeoPixelMode.RGB)
basic.forever(function () {
    buffer = serial.readBuffer(0)
    if (buffer.length > 0) {
        let CODE = buffer.getNumber(NumberFormat.UInt8LE, 0)
if (CODE <= 7 && CODE > 0) {
            strip.setPixelColor(CODE, neopixel.colors(NeoPixelColors.Red))
            strip.show()
            INFERMIERA()
            LED_ATTENZIONE()
        } else if (CODE <= 14 && CODE > 7) {
            strip2.setPixelColor(CODE - 8, neopixel.colors(NeoPixelColors.Red))
            strip2.show()
            INFERMIERA()
            LED_ATTENZIONE()
        } else if (CODE <= 21 && CODE > 14) {
            strip3.setPixelColor(CODE - 15, neopixel.colors(NeoPixelColors.Red))
            strip3.show()
            INFERMIERA()
            LED_ATTENZIONE()
        } else if (CODE <= 28 && CODE > 21) {
            strip4.setPixelColor(CODE - 22, neopixel.colors(NeoPixelColors.Red))
            strip4.show()
            INFERMIERA()
            LED_ATTENZIONE()
        } else if (CODE == 29) {
            strip.showRainbow(1, 360)
            strip2.showRainbow(1, 360)
            strip3.showRainbow(1, 360)
            strip4.showRainbow(1, 360)
            INFERMIERA()
        } else {
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            basic.pause(5000)
            basic.clearScreen()
        }
        CODE = 0
    }
})

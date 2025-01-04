import UI from '@alexgyver/ui';
import './index.css'

/** @type {HTMLCanvasElement} */
let cv;

/** @type {CanvasRenderingContext2D} */
let cx;

/** @type {UI} */
let ui;

const dpi = 72;
const dpmm = dpi / 25.3999;
const offset = 5;

document.addEventListener("DOMContentLoaded", () => {
    cv = document.getElementById('canvas');
    cx = cv.getContext("2d");

    ui = new UI({ title: "BallClock", theme: 'light' })
        .addHTML('', '', 'Стандартный размер - 20x3 (20x7 реальный)')
        .addNumber('balls_w', 'Ширина (шаров)', 20, 1, redraw_h)
        .addNumber('balls_h', 'Высота x2 + 1 (шаров)', 3, 1, redraw_h)
        .addNumber('ball_d', 'Диаметр шара (мм)', 39.9, 0.05, redraw_h)
        .addNumber('led_step', 'Шаг светодиодов (мм)', 33.15, 0.05, redraw_h)
        .addNumber('stroke_w', 'Толщина линий (мм)', 0.4, 0.05, redraw_h)
        .addArea('code', 'Code', '')
        .addButtons({ copy: ["Copy", copy_h], save: ["PNG", export_h] });

    redraw_h();
});

function redraw_h() {
    function mmToP(mm) {
        return mm * dpmm;
    }
    function circle(xmm, ymm, rmm) {
        cx.beginPath();
        cx.arc(mmToP(xmm), mmToP(ymm), mmToP(rmm), 0, 2 * Math.PI);
        cx.stroke();
    }
    function lineTo(xmm, ymm) {
        cx.lineTo(mmToP(xmm), mmToP(ymm));
    }
    function moveTo(xmm, ymm) {
        cx.lineTo(mmToP(xmm), mmToP(ymm));
    }
    function line(x0, y0, x1, y1) {
        cx.beginPath();
        moveTo(x0, y0);
        lineTo(x1, y1);
        cx.stroke();
    }
    function dist(x0, y0, x1, y1) {
        x1 -= x0;
        y1 -= y0;
        return Math.sqrt(x1 * x1 + y1 * y1).toFixed(1);
    }

    const sq3 = Math.sqrt(3);
    const sq3d2 = sq3 / 2;
    const o1x = ui.ball_d / 2 / sq3d2;
    const w = ui.ball_d * ui.balls_w + (o1x - ui.ball_d / 2) * 2 + offset * 2;
    const h = ui.ball_d * (ui.balls_h * 2 * sq3d2 + 1) + offset * 2;

    cv.width = mmToP(w);
    cv.height = mmToP(h);
    cx.lineWidth = mmToP(ui.stroke_w);
    cx.fillStyle = 'white';
    cx.fillRect(0, 0, cv.width, cv.height);
    cx.fillStyle = 'black';
    cx.strokeStyle = 'black';
    cx.strokeRect(0, 0, cv.width, cv.height);

    //#region balls

    for (let r = 0; r < ui.balls_h + 1; r++) {
        for (let rr = -1; rr < 2; rr += 2) {
            for (let x = 0; x < ui.balls_w - r; x++) {
                circle(
                    offset + o1x + ui.ball_d * x + r * ui.ball_d / 2,
                    h / 2 + r * ui.ball_d / 2 * sq3 * rr,
                    ui.ball_d / 2
                );
            }
            if (!r) break; // skip center row
        }
    }

    //#region frame

    const cat = (ui.ball_d / 2 + ui.ball_d * ui.balls_h * sq3d2) * sq3 / 3;
    cx.beginPath();
    moveTo(offset, h / 2);
    lineTo(offset + cat, offset);
    lineTo(w - (offset + cat), offset);
    lineTo(w - offset, h / 2);
    lineTo(w - (offset + cat), h - offset);
    lineTo(offset + cat, h - offset);
    lineTo(offset, h / 2);
    cx.stroke();

    //#region text

    cx.font = `${mmToP(5)}px Arial`;
    let ty = 0;
    const ystep = mmToP(6);
    cx.fillText('Это задняя сторона!', 10, ty += ystep);
    cx.fillText('Ball D = ' + ui.ball_d, 10, ty += ystep);
    cx.fillText('LED step = ' + ui.led_step, 10, ty += ystep);
    cx.fillText(`Рейка ${dist(offset + cat, offset, w - (offset + cat), offset)}мм х2`, 10, ty += ystep);
    cx.fillText(`Рейка ${dist(offset, h / 2, offset + cat, offset)}мм х4`, 10, ty += ystep);
    cx.fillText('Это верх часов', 10, mmToP(h - offset));

    //#region leds

    let ledx = offset + o1x - ui.ball_d / 4;
    let leds = 0;
    let flag = !(ui.balls_h % 2);
    let count = 0, dir = 1, px = 0, py = 0;
    let ledToXY = [];

    function drawLeds(xmm, amount) {
        let y0 = h / 2 - amount * ui.led_step * dir;
        for (let y = 0; y < amount * 2 + 1; y++) {
            let yy = y0 + y * ui.led_step * dir;
            circle(xmm, yy, 5);
            const size = 3;
            line(xmm - size, yy, xmm + size, yy);
            line(xmm, yy - size, xmm, yy + size);
            cx.textAlign = 'center';
            cx.textBaseline = 'middle';

            let bx = offset + o1x + Math.floor((xmm - offset) / ui.ball_d) * ui.ball_d - Math.abs((y - amount) % 2) * ui.ball_d / 2;
            let by = offset + ui.ball_d / 2 + Math.floor((yy - offset) / (ui.ball_d * sq3d2)) * (ui.ball_d * sq3d2);
            cx.fillText(count, mmToP(bx), mmToP(by));

            let rectx = Math.round((bx - offset - o1x) / (ui.ball_d / 2));
            let recty = Math.round((by - offset - ui.ball_d / 2) / (ui.ball_d * sq3d2 / 2));
            ledToXY.push([rectx, recty]);
            // cx.fillText(rectx + ',' + recty, mmToP(bx), mmToP(by + 5));
            if (px && py) {
                cx.lineWidth = mmToP(ui.stroke_w / 2);
                line(px, py, xmm, yy);
                cx.lineWidth = mmToP(ui.stroke_w);
            }
            px = xmm;
            py = yy;
            count++;
        }
        dir = -dir;
    }

    for (let x = 0; x < ui.balls_w; x++) {
        drawLeds(ledx, leds);

        if (x < Math.ceil((ui.balls_h + 1) / 2)) {
            leds += 2;
            if (leds > ui.balls_h) leds = ui.balls_h;
        }
        if (x >= ui.balls_w - Math.ceil((ui.balls_h + 1) / 2)) {
            if (flag) {
                flag = false;
                leds -= 1;
            } else {
                leds -= 2;
            }
        }
        ledx += ui.ball_d;
    }

    //#region export

    function findLED(x, y) {
        for (let led = 0; led < ledToXY.length; led++) {
            if (ledToXY[led][0] == x && ledToXY[led][1] == y) {
                return led;
            }
        }
        return -1;
    }

    const rect_w = ui.balls_w * 2 - 1;
    const rect_h = (ui.balls_h * 2 + 1) * 2 - 1;
    const diag_w = ui.balls_w;
    const diag_h = ui.balls_h * 2 + 1;

    let code = '// BallClock Generator\r\n';
    code += `#define MX_LED_AMOUNT ${ledToXY.length}\r\n`;
    code += `#define MX_XY_W ${rect_w}\r\n`;
    code += `#define MX_XY_H ${rect_h}\r\n`;
    code += `#define MX_DIAG_W ${diag_w}\r\n`;
    code += `#define MX_DIAG_H ${diag_h}\r\n`;
    code += '\r\n\r\n';

    // ledToXY
    // code += `static const uint8_t ledToXY[MX_LED_AMOUNT][2] = {\r\n`;
    // for (let row of ledToXY) {
    //     code += `\t{${row[0]}, ${row[1]}},\r\n`;
    // }
    // code += '};\r\n\r\n';

    // xyToLed
    code += '// BallClock Generator\r\n';
    code += `static const uint8_t xyToLed[MX_DIAG_H][MX_XY_W] = {\r\n`;
    for (let y = rect_h - 1; y >= 0; y--) {
        // for (let x = 0; x < rect_w; x++) {
        //     circle(offset + o1x + x * ui.ball_d / 2, offset + ui.ball_d / 2 + y * ui.ball_d * sq3d2 / 2, 3);
        // }

        if (y % 2) continue;
        code += '\t{';
        for (let x = 0; x < rect_w; x++) {
            let fled = findLED(x, y);
            code += (fled >= 0) ? (fled + 1) : 0;
            if (x != rect_w - 1) code += ', ';
        }
        code += '},\r\n';
    }
    code += '};\r\n\r\n';

    // diagToLed
    code += `static const uint8_t diagToLed[MX_DIAG_H][MX_DIAG_W] = {\r\n`;
    for (let y = diag_h - 1; y >= 0; y--) {
        code += '\t{';
        for (let x = 0; x < diag_w; x++) {
            let cx = offset + o1x + ui.balls_h / 2 * ui.ball_d + x * ui.ball_d - (diag_h - 1 - y) * ui.ball_d / 2;
            let cy = offset + ui.ball_d / 2 + y * ui.ball_d * sq3d2;
            // circle(cx, cy, 3);
            let rx = Math.round((cx - offset - o1x) / (ui.ball_d / 2));
            let ry = Math.round((cy - offset - ui.ball_d / 2) / (ui.ball_d * sq3d2 / 2));

            let fled = findLED(rx, ry);
            code += (fled >= 0) ? (fled + 1) : 0;
            if (x != diag_w - 1) code += ', ';
        }
        code += '},\r\n';
    }
    code += '};\r\n';

    ui.code = code;
}

function export_h() {
    let link = document.createElement('a');
    link.href = cv.toDataURL('image/png');
    link.download = 'BallClock.png';
    link.click();
}

function copy_h() {
    navigator.clipboard.writeText(ui.code);
}
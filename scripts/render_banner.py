"""Draw the profile's block landscape and export its sixteen-second loop."""

from dataclasses import dataclass
from pathlib import Path
from random import Random

from PIL import Image, ImageColor, ImageDraw


WIDTH, HEIGHT = 320, 80
FRAME_COUNT = 64
OUTPUT = Path(__file__).resolve().parents[1] / "assets" / "block-world.gif"

# Day, sunset, and night inks for the same features of the landscape.
INKS = {
    "sky": ("#76c7dd", "#ad82a5", "#202b50"),
    "air": ("#a4dcdc", "#e6a28d", "#354363"),
    "haze": ("#d4e9cf", "#ffd39b", "#485e75"),
    "sun": ("#fff2b0", "#ffce84", "#acced0"),
    "light": ("#fffada", "#ffe7b4", "#e2e7cd"),
    "cloud": ("#f2f4db", "#f7c8a6", "#58637f"),
    "cloud_shadow": ("#cae2d9", "#dfaa9e", "#414d6d"),
    "peak": ("#7faaa9", "#aa8995", "#394862"),
    "peak_face": ("#98c2b8", "#c69b95", "#53647b"),
    "snow": ("#e2ebce", "#f2cfac", "#8d9ba1"),
    "ridge": ("#568e85", "#856e76", "#2b4352"),
    "far_tree": ("#3e726b", "#675d65", "#233946"),
    "lake": ("#61b6bd", "#c48d88", "#314c64"),
    "ripple": ("#b0e2d3", "#f9c69e", "#668299"),
    "deep": ("#429ca8", "#a57c80", "#293f58"),
    "grass": ("#a4c967", "#c1ac65", "#607856"),
    "moss": ("#719d59", "#968754", "#4b6450"),
    "edge": ("#537e4b", "#726847", "#354b40"),
    "soil": ("#956847", "#946349", "#514343"),
    "clay": ("#bb8855", "#b98255", "#68514a"),
    "stone": ("#6a675b", "#75645e", "#3e4049"),
    "bark": ("#5b4736", "#654435", "#302e38"),
    "needles": ("#356747", "#52604b", "#283f3e"),
    "leaf": ("#508154", "#707950", "#395747"),
    "leaf_tip": ("#79a15a", "#969155", "#4c6650"),
    "timber": ("#ba8251", "#bb7c51", "#6a5051"),
    "timber_lit": ("#dda565", "#e4a567", "#89675b"),
    "timber_dark": ("#94613f", "#935d44", "#53404a"),
    "roof": ("#855345", "#915448", "#493c4a"),
    "shingle": ("#ab6b4e", "#b87352", "#624c57"),
    "roof_lit": ("#cd885c", "#da9060", "#795863"),
    "glass": ("#a2d8d4", "#b0c6c2", "#738897"),
    "glass_dark": ("#658f96", "#8a8992", "#4d6076"),
    "poppy": ("#dc7053", "#d87a5f", "#82616a"),
}
COLORS = {key: tuple(map(ImageColor.getrgb, tones)) for key, tones in INKS.items()}


@dataclass(frozen=True)
class FrameState:
    cloud_x: int
    lights_on: bool
    # 0 = daylight, 1 = sunset, 2 = night
    shade: float


def frame_state(index):
    index %= FRAME_COUNT
    shade = max(0.0, min(2.0, (index - 16) / 8, (64 - index) / 8))
    return FrameState(index, 28 <= index < 60, shade)


def mix(a, b, amount):
    return tuple(round(x + (y - x) * amount) for x, y in zip(a, b))


def terrace(draw, steps, bottom, color):
    """Fill a ridge from a series of horizontal ledges."""
    for (x, y), (next_x, _) in zip(steps, steps[1:]):
        draw.rectangle((x, y, next_x - 1, bottom), fill=color)


def sky_and_valley(draw, c, state):
    # Horizontal bands keep the palette of a small game-world sky.
    for y in range(0, 49, 4):
        start, end = (c["sky"], c["air"]) if y < 24 else (c["air"], c["haze"])
        draw.rectangle((0, y, WIDTH - 1, y + 3), mix(start, end, (y % 24) / 24))
    for x, y in [
        (16, 9),
        (51, 4),
        (77, 18),
        (127, 8),
        (142, 3),
        (172, 16),
        (192, 4),
        (226, 10),
        (254, 5),
        (277, 19),
        (311, 8),
    ]:
        if state.shade > 1:
            draw.point((x, y), mix(c["sky"], c["light"], state.shade - 1))
    # The sun sets behind the ridges and the square moon rises in the east.
    for x, top, size in [
        (85, 6 + round(22 * state.shade), 8),
        (248, 50 - round(21 * state.shade), 6),
    ]:
        draw.rectangle((x, top, x + size, top + size), c["sun"])
        draw.rectangle((x + 1, top + 1, x + size - 1, top + size - 1), c["light"])
    for x in range(state.cloud_x - 64, WIDTH, 64):
        for dx, y, w in [(0, 11, 17), (37, 20, 10)]:
            left = x + dx
            draw.rectangle((left, y, left + w, y + 2), c["cloud_shadow"])
            draw.rectangle((left + 2, y - 2, left + w - 3, y), c["cloud"])
            draw.rectangle((left + 6, y - 3, left + w - 4, y), c["cloud"])
    peaks = [
        (0, 37),
        (12, 34),
        (22, 29),
        (32, 24),
        (39, 19),
        (46, 23),
        (53, 29),
        (64, 36),
        (78, 39),
        (92, 34),
        (100, 28),
        (110, 23),
        (118, 26),
        (127, 32),
        (139, 37),
        (160, 40),
        (182, 34),
        (201, 32),
        (217, 26),
        (226, 20),
        (233, 17),
        (240, 22),
        (248, 27),
        (260, 34),
        (279, 37),
        (295, 31),
        (309, 28),
        (320, 30),
    ]
    terrace(draw, peaks, 49, c["peak"])
    for x, y in [(39, 19), (110, 23), (233, 17), (309, 28)]:
        for i, width in enumerate((6, 11, 16)):
            draw.rectangle(
                (x - 3 * i, y + 4 * i, x - 3 * i + width, y + 4 * i + 3),
                c["snow"] if i == 0 else c["peak_face"],
            )
    terrace(
        draw,
        [
            (0, 37),
            (20, 40),
            (38, 41),
            (60, 38),
            (83, 40),
            (104, 43),
            (133, 43),
            (147, 39),
            (171, 38),
            (195, 42),
            (215, 40),
            (236, 38),
            (262, 35),
            (284, 39),
            (306, 41),
            (320, 42),
        ],
        52,
        c["ridge"],
    )
    woods = Random(18)
    for x in range(-2, WIDTH, 3):
        y = woods.randint(41, 45)
        draw.rectangle((x, y, x + 1, 50), c["far_tree"])
        draw.rectangle((x - 1, y + 3, x + 2, 50), c["far_tree"])
    draw.rectangle((0, 50, WIDTH, HEIGHT), c["lake"])
    for y in (50, 51, 61, 70):
        draw.line((0, y, WIDTH, y), c["deep"])
    for _ in range(55):
        x, y = woods.randrange(WIDTH), woods.randrange(52, HEIGHT)
        draw.line((x, y, x + woods.randint(2, 10), y), c["ripple"])


def ground(draw, c):
    steps = [
        (0, 57),
        (19, 60),
        (32, 64),
        (46, 68),
        (57, 73),
        (70, 77),
        (81, 80),
        (93, 77),
        (104, 73),
        (116, 69),
        (128, 65),
        (145, 61),
        (162, 58),
        (225, 61),
        (242, 58),
        (261, 54),
        (278, 51),
        (304, 53),
        (320, 53),
    ]
    soil = Random(47)
    for (x, top), (right, _) in zip(steps, steps[1:]):
        draw.rectangle((x, top, right - 1, HEIGHT), c["soil"])
        for _ in range((right - x) * max(0, HEIGHT - top - 4) // 13):
            sx, sy = soil.randrange(x, right), soil.randrange(top + 4, HEIGHT)
            draw.line(
                (sx, sy, min(sx + soil.randrange(1, 4), right - 1), sy),
                soil.choice((c["clay"], c["stone"])),
            )
        draw.rectangle((x, top, right - 1, top + 1), c["grass"])
        draw.line((x, top + 2, right - 1, top + 2), c["moss"])
        for sx in range(x + 2, right - 2, 5):
            draw.line((sx, top + 3, sx + 1, top + 3), c["edge"])
    for x, y in [(21, 59), (31, 59), (132, 64), (140, 64), (157, 60), (251, 57), (299, 50)]:
        draw.line((x, y - 3, x, y), c["edge"])
        draw.line((x - 1, y - 3, x + 1, y - 3), c["poppy"])


def spruce(draw, x, base, scale, c):
    def box(left, top, right, bottom, color):
        draw.rectangle(
            (
                x + left * scale,
                base + top * scale,
                x + (right + 1) * scale - 1,
                base + (bottom + 1) * scale - 1,
            ),
            color,
        )

    box(-1, -12, 0, -1, c["bark"])
    for half, y in [(6, -6), (5, -10), (3, -14), (1, -17)]:
        box(-half, y, half, y + 2, c["needles"])
        box(-half + 1, y - 2, half - 1, y, c["leaf"])
        box(-half + 1, y - 2, 0, y - 2, c["leaf_tip"])


def oak(draw, x, base, c):
    """A thick trunk and overlapping cubes catch light on their top faces."""
    draw.rectangle((x - 2, base - 22, x + 2, base - 1), c["bark"])
    draw.line((x - 1, base - 15, x - 1, base - 2), c["timber_dark"])
    for dx, dy, size in [(-14, -30, 15), (-4, -35, 16), (6, -26, 12), (-4, -24, 13)]:
        left, top = x + dx, base + dy
        draw.rectangle((left, top, left + size, top + size - 4), c["leaf"])
        draw.rectangle((left, top, left + size, top + 1), c["leaf_tip"])
        draw.rectangle((left + size - 3, top + 2, left + size, top + size - 4), c["needles"])
        for px, py in [(2, 3), (6, 5), (3, 7)]:
            draw.line((left + px, top + py, left + px + 1, top + py), c["leaf_tip"])


def cabin(draw, c, lights_on):
    # Gabled front at left, a long shingled roof and an end wall to the right.
    draw.rectangle((165, 55, 220, 58), c["stone"])
    draw.rectangle((166, 39, 191, 55), c["timber"])
    draw.rectangle((192, 39, 218, 55), c["timber_dark"])
    for y in range(42, 55, 4):
        draw.line((166, y, 191, y), c["timber_lit"])
        draw.line((193, y, 218, y), c["timber"])
    for x in (166, 190, 216):
        draw.rectangle((x, 39, x + 2, 55), c["bark"])
    draw.rectangle((203, 22, 207, 31), c["stone"])
    draw.rectangle((202, 21, 208, 23), c["timber_dark"])
    for i in range(7):
        y = 26 + i * 2
        left, ridge, end = 178 - 2 * i, 179 + 2 * i, 209 + 2 * i
        draw.rectangle((left, y, ridge, y + 1), c["timber_lit"])
        draw.rectangle((ridge, y, end, y + 1), c["shingle"] if i % 2 else c["roof"])
        draw.line((left, y, left + 2, y), c["roof_lit"])
        for x in range(ridge + 5 + i % 3, end - 2, 9):
            draw.line((x, y, x + 2, y), c["roof_lit"])
    draw.rectangle((177, 32, 180, 36), c["bark"])
    draw.rectangle((178, 33, 179, 35), c["timber"])
    draw.rectangle((162, 40, 222, 41), c["bark"])
    draw.rectangle((184, 45, 189, 55), c["bark"])
    draw.rectangle((185, 46, 188, 54), c["timber_dark"])
    draw.point((187, 50), c["timber_lit"])
    for x in (170, 198, 207):
        draw.rectangle((x - 1, 44, x + 5, 51), c["bark"])
        draw.rectangle((x, 45, x + 4, 50), "#ffc874" if lights_on else c["glass"])
        draw.rectangle((x, 48, x + 4, 50), "#ef9958" if lights_on else c["glass_dark"])
        draw.line((x + 2, 45, x + 2, 50), c["timber_dark"])
        draw.line((x - 1, 51, x + 5, 51), c["timber_lit"])
    draw.rectangle((182, 56, 191, 57), c["timber_lit"])


def render_frame(index):
    state = frame_state(index)
    segment = min(1, int(state.shade))
    c = {
        key: mix(tones[segment], tones[segment + 1], state.shade - segment)
        for key, tones in COLORS.items()
    }
    image = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(image)
    sky_and_valley(draw, c, state)
    ground(draw, c)
    for x, y, scale in [
        (5, 57, 2),
        (23, 60, 1),
        (153, 61, 1),
        (245, 58, 1),
        (304, 53, 1),
        (317, 53, 1),
    ]:
        spruce(draw, x, y, scale, c)
    oak(draw, 284, 51, c)
    cabin(draw, c, state.lights_on)
    return image


def main():
    frames = [render_frame(index) for index in range(FRAME_COUNT)]
    # Sample the entire cycle so dusk and the warm window light get palette entries.
    atlas = Image.new("RGB", (WIDTH, HEIGHT * FRAME_COUNT))
    for index, frame in enumerate(frames):
        atlas.paste(frame, (0, HEIGHT * index))
    palette = atlas.quantize(colors=256)
    export = [
        frame.quantize(palette=palette, dither=Image.Dither.NONE).resize(
            (WIDTH * 3, HEIGHT * 3), Image.Resampling.NEAREST
        )
        for frame in frames
    ]
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    export[0].save(
        OUTPUT,
        save_all=True,
        append_images=export[1:],
        duration=250,
        loop=0,
        disposal=1,
        optimize=False,
    )


if __name__ == "__main__":
    main()

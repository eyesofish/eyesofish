import unittest

from scripts.render_banner import frame_state


class BannerClockTests(unittest.TestCase):
    def test_cabin_lights_switch_at_seven_and_fifteen_seconds(self):
        for index, expected in [(27, False), (28, True), (59, True), (60, False)]:
            with self.subTest(index=index):
                self.assertEqual(frame_state(index).lights_on, expected)

    def test_clouds_step_right_through_first_three_seconds_and_loop_seam(self):
        for index in [*range(12), 63]:
            next_index = (index + 1) % 64
            with self.subTest(index=index, next_index=next_index):
                displacement = frame_state(next_index).cloud_x - frame_state(index).cloud_x
                self.assertEqual(displacement % 64, 1)


if __name__ == "__main__":
    unittest.main()

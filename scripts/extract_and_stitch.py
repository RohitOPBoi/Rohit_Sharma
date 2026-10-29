"""
Avatar Frame Extraction & Scrubbing Sync
---------------------------------------
Extracts frames from the 1080p source video (public/media/avatar.mp4)
at native resolution (1920x1080) for high-fidelity 60fps canvas scrubbing.
"""

import cv2
import os
import json

def main():
    avatar_path = "public/media/avatar.mp4"
    if not os.path.exists(avatar_path):
        print(f"Error: Avatar video not found at {avatar_path}")
        return

    cap = cv2.VideoCapture(avatar_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    num_frames = 120
    indices = [int(round(i * (total_frames - 1) / (num_frames - 1))) for i in range(num_frames)]
    center_idx = min(range(num_frames), key=lambda i: abs(indices[i] - 60))

    os.makedirs("public/frames", exist_ok=True)
    for i, f_idx in enumerate(indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
        ret, frame = cap.read()
        if ret:
            cv2.imwrite(f"public/frames/frame_{i:03d}.webp", frame, [cv2.IMWRITE_WEBP_QUALITY, 88])

    manifest = {
        "totalFrames": num_frames,
        "width": 1920,
        "height": 1080,
        "fps": fps,
        "leftmostFrameIndex": 0,
        "neutralFrameIndex": center_idx,
        "rightmostFrameIndex": num_frames - 1,
        "leftmostTimestamp": 0.0,
        "neutralTimestamp": round(indices[center_idx] / fps, 3),
        "rightmostTimestamp": round((total_frames - 1) / fps, 3),
        "namingPattern": "/frames/frame_%03d.webp"
    }

    with open("public/frames/manifest.json", "w") as mf:
        json.dump(manifest, mf, indent=2)

    print(f"Successfully generated {num_frames} frames at 1920x1080. Manifest updated.")
    cap.release()

if __name__ == "__main__":
    main()

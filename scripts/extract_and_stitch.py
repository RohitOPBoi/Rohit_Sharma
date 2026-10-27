"""
Avatar Frame Extraction & Two-Clip Stitching Script
---------------------------------------------------
This script extracts frames from avatar video clips for 60fps canvas scrubbing.

Usage:
  python scripts/extract_and_stitch.py

Features:
1. Detects if only 'public/media/avatar.mp4' (or 'avatar_left.mp4') exists.
   -> Extracts 72 frames (Left -> Center).
2. Detects if 'public/media/avatar_right.mp4' is provided.
   -> Stitches Left -> Center -> Right into a seamless 96-frame sequence without video mirroring.
3. Automatically updates 'public/frames/manifest.json'.
"""

import cv2
import os
import json

def extract_clip(clip_path, num_frames, target_width=1280):
    if not os.path.exists(clip_path):
        return None
    cap = cv2.VideoCapture(clip_path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    target_height = int(h * target_width / w)
    
    indices = [int(i * (total - 1) / (num_frames - 1)) for i in range(num_frames)]
    frames = []
    for idx in indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if ret:
            resized = cv2.resize(frame, (target_width, target_height), interpolation=cv2.INTER_AREA)
            frames.append(resized)
    cap.release()
    return frames

def main():
    os.makedirs("public/frames", exist_ok=True)
    os.makedirs("public/media", exist_ok=True)
    
    avatar_path = "public/media/avatar.mp4"
    if not os.path.exists(avatar_path):
        avatar_path = "public/media/avatar_left.mp4"
    avatar_right_path = "public/media/avatar_right.mp4"
    
    has_right = os.path.exists(avatar_right_path)
    
    if not os.path.exists(avatar_path):
        print(f"Error: Avatar video not found at {avatar_path}")
        return

    if has_right:
        print("Detected both left/center clip and avatar_right.mp4! Stitching full sequence...")
        left_frames = extract_clip(avatar_path, 48)
        right_frames = extract_clip(avatar_right_path, 48)
        
        all_frames = left_frames + right_frames[1:] # Avoid duplicate center frame
        neutral_idx = 47
        leftmost_idx = 0
        rightmost_idx = len(all_frames) - 1
    else:
        print("Only left-to-center clip detected. Generating 72-frame single-range sequence...")
        all_frames = extract_clip(avatar_path, 72)
        neutral_idx = len(all_frames) - 1
        leftmost_idx = 0
        rightmost_idx = len(all_frames) - 1

    # Save webp frames
    for i, f in enumerate(all_frames):
        out_path = f"public/frames/frame_{i:03d}.webp"
        cv2.imwrite(out_path, f, [cv2.IMWRITE_WEBP_QUALITY, 85])
    
    manifest = {
        "totalFrames": len(all_frames),
        "width": 1280,
        "height": 720,
        "neutralFrameIndex": neutral_idx,
        "leftmostFrameIndex": leftmost_idx,
        "rightmostFrameIndex": rightmost_idx,
        "hasRightClip": has_right,
        "namingPattern": "/frames/frame_%03d.webp"
    }
    
    with open("public/frames/manifest.json", "w") as mf:
        json.dump(manifest, mf, indent=2)

    print(f"Successfully processed {len(all_frames)} frames. Manifest updated.")

if __name__ == "__main__":
    main()

const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const exercises = JSON.parse(
  fs.readFileSync(path.join(__dirname, "exercises.json"), "utf-8")
);

const outputDir = path.join(__dirname, "audio");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function generateTTS(bodyPart, text, index) {
  const filename = `${String(index + 1).padStart(2, "0")}_${bodyPart}.mp3`;
  const outputPath = path.join(outputDir, filename);

  console.log(`Generating: ${filename} (${text.length}자)`);

  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: text,
    speed: 0.95,
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`  -> Saved: ${outputPath}`);
}

async function main() {
  console.log("=== 부위별 운동 가이드 TTS 생성 ===\n");

  // Print exercise text summaries
  for (const ex of exercises.exercises) {
    console.log(`[${ex.bodyPart}] (${ex.text.length}자)`);
    console.log(`  ${ex.text}\n`);
  }

  console.log("--- TTS 음성 파일 생성 시작 ---\n");

  for (let i = 0; i < exercises.exercises.length; i++) {
    const ex = exercises.exercises[i];
    await generateTTS(ex.bodyPart, ex.text, i);
  }

  console.log("\n=== 완료! audio/ 폴더에서 mp3 파일을 확인하세요 ===");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});

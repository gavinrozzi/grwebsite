import satori from 'satori';
import sharp from 'sharp';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateContourBackground } from './contour-renderer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function generateOGImage(width, height, filename) {
  const contourCanvas = generateContourBackground(width, height, 2.5);
  const contourBuffer = contourCanvas.toBuffer('image/png');
  const contourBase64 = `data:image/png;base64,${contourBuffer.toString('base64')}`;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${contourBase64})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 40%, rgba(249, 115, 22, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '32px',
                position: 'relative',
                zIndex: 1,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f97316 0%, #14b8a6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '4px solid white',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '72px',
                                  fontWeight: 700,
                                  background: 'linear-gradient(135deg, #f97316 0%, #14b8a6 100%)',
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text',
                                  color: 'transparent',
                                  letterSpacing: '-0.02em',
                                },
                                children: 'GR',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '64px',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            letterSpacing: '-0.02em',
                          },
                          children: 'Gavin Rozzi',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '32px',
                            fontWeight: 700,
                            color: '#18181b',
                            textAlign: 'center',
                            maxWidth: '900px',
                            lineHeight: 1.2,
                          },
                          children: 'Digital Transformation & Civic Technology Executive',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '24px',
                            fontWeight: 400,
                            color: '#52525b',
                            textAlign: 'center',
                            maxWidth: '800px',
                            lineHeight: 1.4,
                          },
                          children: 'Building data-driven platforms that turn policy into impact',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width,
      height,
      fonts: [
        {
          name: 'Plus Jakarta Sans',
          data: await readFile(join(__dirname, '..', 'node_modules', '@fontsource', 'plus-jakarta-sans', 'files', 'plus-jakarta-sans-latin-700-normal.woff')),
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Plus Jakarta Sans',
          data: await readFile(join(__dirname, '..', 'node_modules', '@fontsource', 'plus-jakarta-sans', 'files', 'plus-jakarta-sans-latin-400-normal.woff')),
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  await writeFile(join(publicDir, filename), pngBuffer);
  console.log(`✅ Generated ${filename} (${width}x${height})`);
}

async function main() {
  console.log('🎨 Generating OG images...\n');

  try {
    await generateOGImage(1200, 630, 'og-default.png');
    await generateOGImage(1200, 600, 'og-twitter.png');

    console.log('\n✨ All OG images generated successfully!');
  } catch (error) {
    console.error('❌ Error generating OG images:', error);
    process.exit(1);
  }
}

main();

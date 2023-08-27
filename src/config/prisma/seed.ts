import { Fraction, PrismaClient, Rarity } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const deck1 = await prisma.deck.upsert({
    where: { id: '173df5ce-0d8d-441b-828f-43b419f9fd2c' },
    update: {},
    create: {
      name: 'Test deck name',
      fraction: Fraction.SKELLIGE,
      description: 'Test deck description',
      cards: {
        createMany: {
          data: [
            {
              name: 'Card 1 name',
              description: 'Some description',
              fraction: Fraction.NORTHERN_KINGDOMS,
              abilities: [
                {
                  name: 'Ability name',
                  description: 'Some ability description',
                  value: 'test value',
                },
              ],
              image: Buffer.from(''),
              power: 10,
              rarity: Rarity.COMMON,
            },
            {
              name: 'Card 2 name',
              description: 'Some description',
              fraction: Fraction.NORTHERN_KINGDOMS,
              abilities: [
                {
                  name: 'Ability name',
                  description: 'Some ability description',
                  value: 'test value',
                },
              ],
              image: Buffer.from(''),
              power: 15,
              rarity: Rarity.COMMON,
            },
          ],
        },
      },
    },
  });
  const deck2 = await prisma.deck.upsert({
    where: { id: 'd7ff98da-457a-4080-ad87-c3e5705a903a' },
    update: {},
    create: {
      name: 'Test deck name 2',
      fraction: Fraction.NORTHERN_KINGDOMS,
      description: 'Test deck description',
    },
  });

  console.log({ deck1, deck2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

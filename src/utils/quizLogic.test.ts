import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getToneInfo,
  shuffleArray,
  pickAnswerOptions,
  createQuizQuestion,
  updateStatsOnAnswer,
  INITIAL_USER_STATS
} from './quizLogic';
import { VocabItem } from '../types';

const mockVocab: VocabItem[] = [
  {
    id: 'w1',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações',
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    tom: 3,
    traducao: 'Olá',
    icone: '👋',
    exemplo_curto: { hanzi: '你好！', pinyin: 'Nǐ hǎo!', traducao: 'Olá!' }
  },
  {
    id: 'w2',
    categoria: 'saudacoes',
    categoriaNome: 'Saudações',
    hanzi: '谢谢',
    pinyin: 'xièxie',
    tom: 4,
    traducao: 'Obrigado',
    icone: '🙏',
    exemplo_curto: { hanzi: '谢谢！', pinyin: 'Xièxie!', traducao: 'Obrigado!' }
  },
  {
    id: 'w3',
    categoria: 'rotina',
    categoriaNome: 'Rotina',
    hanzi: '水',
    pinyin: 'shuǐ',
    tom: 3,
    traducao: 'Água',
    icone: '💧',
    exemplo_curto: { hanzi: '喝水。', pinyin: 'Hē shuǐ.', traducao: 'Beber água.' }
  },
  {
    id: 'w4',
    categoria: 'numeros_tempo',
    categoriaNome: 'Números',
    hanzi: '一',
    pinyin: 'yī',
    tom: 1,
    traducao: 'Um',
    icone: '1️⃣',
    exemplo_curto: { hanzi: '一个人。', pinyin: 'Yí gè rén.', traducao: 'Uma pessoa.' }
  },
  {
    id: 'w5',
    categoria: 'verbos',
    categoriaNome: 'Verbos',
    hanzi: '去',
    pinyin: 'qù',
    tom: 4,
    traducao: 'Ir',
    icone: '🚶',
    exemplo_curto: { hanzi: '去哪儿？', pinyin: 'Qù nǎr?', traducao: 'Ir aonde?' }
  }
];

test('getToneInfo returns proper tone data for each Mandarin tone', () => {
  const t1 = getToneInfo(1);
  assert.equal(t1.number, 1);
  assert.equal(t1.symbol, 'mā');
  assert.equal(t1.contour, '5-5');

  const t2 = getToneInfo(2);
  assert.equal(t2.number, 2);
  assert.equal(t2.symbol, 'má');

  const t3 = getToneInfo(3);
  assert.equal(t3.number, 3);
  assert.equal(t3.symbol, 'mǎ');

  const t4 = getToneInfo(4);
  assert.equal(t4.number, 4);
  assert.equal(t4.symbol, 'mà');

  const t0 = getToneInfo(0);
  assert.equal(t0.number, 0);
  assert.equal(t0.symbol, 'ma');
});

test('shuffleArray preserves length and items', () => {
  const original = [1, 2, 3, 4, 5, 6, 7];
  const shuffled = shuffleArray(original);
  assert.equal(shuffled.length, original.length);
  assert.deepEqual(new Set(shuffled), new Set(original));
});

test('pickAnswerOptions includes target and returns 4 unique options', () => {
  const target = mockVocab[0];
  const options = pickAnswerOptions(target, mockVocab, 4);
  assert.equal(options.length, 4);
  assert.ok(options.some(opt => opt.id === target.id), 'Target must be present in options');
  const ids = options.map(o => o.id);
  assert.equal(new Set(ids).size, 4, 'All 4 options must be distinct');
});

test('createQuizQuestion formats quiz structure properly', () => {
  const target = mockVocab[1];
  const question = createQuizQuestion(target, mockVocab, 'audio_to_hanzi');
  assert.equal(question.target.id, target.id);
  assert.equal(question.type, 'audio_to_hanzi');
  assert.equal(question.options.length, 4);
  assert.ok(question.options.some(o => o.id === target.id));
});

test('updateStatsOnAnswer handles streak and learned list correctly', () => {
  const s0 = INITIAL_USER_STATS;
  
  // Correct answer
  const s1 = updateStatsOnAnswer(s0, true, 'w1');
  assert.equal(s1.currentStreak, 1);
  assert.equal(s1.bestStreak, 1);
  assert.equal(s1.totalAnswered, 1);
  assert.equal(s1.totalCorrect, 1);
  assert.ok(s1.learnedIds.includes('w1'));
  assert.equal(s1.mistakeIds.length, 0);

  // Another correct answer
  const s2 = updateStatsOnAnswer(s1, true, 'w2');
  assert.equal(s2.currentStreak, 2);
  assert.equal(s2.bestStreak, 2);
  assert.equal(s2.learnedIds.length, 2);

  // Wrong answer resets current streak, keeps best streak, adds to mistakes
  const s3 = updateStatsOnAnswer(s2, false, 'w3');
  assert.equal(s3.currentStreak, 0);
  assert.equal(s3.bestStreak, 2);
  assert.equal(s3.totalAnswered, 3);
  assert.equal(s3.totalCorrect, 2);
  assert.ok(s3.mistakeIds.includes('w3'));

  // Fixing the mistake removes from mistakes
  const s4 = updateStatsOnAnswer(s3, true, 'w3');
  assert.equal(s4.currentStreak, 1);
  assert.ok(!s4.mistakeIds.includes('w3'), 'Mistake should be cleared once answered correctly');
});

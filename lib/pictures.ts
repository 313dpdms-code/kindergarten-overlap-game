export type Picture = {
  id: string;
  name: string;
  emoji: string;
  codepoint: string;
  category: "animals" | "fruits" | "vehicles" | "food" | "nature";
};

const ANIMALS: Picture[] = [
  { id: "dog", name: "강아지", emoji: "🐶", codepoint: "1f436", category: "animals" },
  { id: "cat", name: "고양이", emoji: "🐱", codepoint: "1f431", category: "animals" },
  { id: "rabbit", name: "토끼", emoji: "🐰", codepoint: "1f430", category: "animals" },
  { id: "bear", name: "곰", emoji: "🐻", codepoint: "1f43b", category: "animals" },
  { id: "lion", name: "사자", emoji: "🦁", codepoint: "1f981", category: "animals" },
  { id: "tiger", name: "호랑이", emoji: "🐯", codepoint: "1f42f", category: "animals" },
  { id: "elephant", name: "코끼리", emoji: "🐘", codepoint: "1f418", category: "animals" },
  { id: "monkey", name: "원숭이", emoji: "🐵", codepoint: "1f435", category: "animals" },
  { id: "panda", name: "판다", emoji: "🐼", codepoint: "1f43c", category: "animals" },
  { id: "pig", name: "돼지", emoji: "🐷", codepoint: "1f437", category: "animals" },
  { id: "frog", name: "개구리", emoji: "🐸", codepoint: "1f438", category: "animals" },
  { id: "chicken", name: "닭", emoji: "🐔", codepoint: "1f414", category: "animals" },
];

const FRUITS: Picture[] = [
  { id: "apple", name: "사과", emoji: "🍎", codepoint: "1f34e", category: "fruits" },
  { id: "banana", name: "바나나", emoji: "🍌", codepoint: "1f34c", category: "fruits" },
  { id: "grape", name: "포도", emoji: "🍇", codepoint: "1f347", category: "fruits" },
  { id: "strawberry", name: "딸기", emoji: "🍓", codepoint: "1f353", category: "fruits" },
  { id: "watermelon", name: "수박", emoji: "🍉", codepoint: "1f349", category: "fruits" },
  { id: "orange", name: "오렌지", emoji: "🍊", codepoint: "1f34a", category: "fruits" },
  { id: "peach", name: "복숭아", emoji: "🍑", codepoint: "1f351", category: "fruits" },
  { id: "pineapple", name: "파인애플", emoji: "🍍", codepoint: "1f34d", category: "fruits" },
  { id: "lemon", name: "레몬", emoji: "🍋", codepoint: "1f34b", category: "fruits" },
  { id: "cherry", name: "체리", emoji: "🍒", codepoint: "1f352", category: "fruits" },
];

const VEHICLES: Picture[] = [
  { id: "car", name: "자동차", emoji: "🚗", codepoint: "1f697", category: "vehicles" },
  { id: "bus", name: "버스", emoji: "🚌", codepoint: "1f68c", category: "vehicles" },
  { id: "train", name: "기차", emoji: "🚂", codepoint: "1f682", category: "vehicles" },
  { id: "airplane", name: "비행기", emoji: "✈️", codepoint: "2708", category: "vehicles" },
  { id: "ship", name: "배", emoji: "🚢", codepoint: "1f6a2", category: "vehicles" },
  { id: "bicycle", name: "자전거", emoji: "🚲", codepoint: "1f6b2", category: "vehicles" },
  { id: "truck", name: "트럭", emoji: "🚚", codepoint: "1f69a", category: "vehicles" },
  { id: "helicopter", name: "헬리콥터", emoji: "🚁", codepoint: "1f681", category: "vehicles" },
];

// 음식 카테고리 (5장 모드를 위해 새로 추가)
const FOODS: Picture[] = [
  { id: "cake", name: "케이크", emoji: "🍰", codepoint: "1f370", category: "food" },
  { id: "pizza", name: "피자", emoji: "🍕", codepoint: "1f355", category: "food" },
  { id: "bread", name: "빵", emoji: "🍞", codepoint: "1f35e", category: "food" },
  { id: "hamburger", name: "햄버거", emoji: "🍔", codepoint: "1f354", category: "food" },
  { id: "icecream", name: "아이스크림", emoji: "🍦", codepoint: "1f366", category: "food" },
  { id: "candy", name: "사탕", emoji: "🍬", codepoint: "1f36c", category: "food" },
  { id: "donut", name: "도넛", emoji: "🍩", codepoint: "1f369", category: "food" },
  { id: "cookie", name: "쿠키", emoji: "🍪", codepoint: "1f36a", category: "food" },
];

// 자연 카테고리 (5장 모드를 위해 새로 추가)
const NATURE: Picture[] = [
  { id: "sun", name: "해", emoji: "☀️", codepoint: "2600", category: "nature" },
  { id: "moon", name: "달", emoji: "🌙", codepoint: "1f319", category: "nature" },
  { id: "star", name: "별", emoji: "⭐", codepoint: "2b50", category: "nature" },
  { id: "cloud", name: "구름", emoji: "☁️", codepoint: "2601", category: "nature" },
  { id: "rainbow", name: "무지개", emoji: "🌈", codepoint: "1f308", category: "nature" },
  { id: "flower", name: "꽃", emoji: "🌸", codepoint: "1f338", category: "nature" },
  { id: "tree", name: "나무", emoji: "🌳", codepoint: "1f333", category: "nature" },
  { id: "snowflake", name: "눈송이", emoji: "❄️", codepoint: "2744", category: "nature" },
];

export const PICTURE_GROUPS = [
  { id: "animals", name: "동물", pictures: ANIMALS },
  { id: "fruits", name: "과일", pictures: FRUITS },
  { id: "vehicles", name: "탈것", pictures: VEHICLES },
  { id: "food", name: "음식", pictures: FOODS },
  { id: "nature", name: "자연", pictures: NATURE },
];

// 한 라운드의 그림을 뽑는 함수
// count=3이면 5개 카테고리 중 3개를 무작위로 골라 1장씩,
// count=5이면 5개 카테고리 모두에서 1장씩 뽑아 섞어 반환합니다.
export function pickMixedPictures(count: 3 | 5): Picture[] {
  const pickOne = (arr: Picture[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  // 카테고리 목록을 무작위로 섞은 뒤 앞에서 count개만 사용
  const shuffledGroups = [...PICTURE_GROUPS].sort(() => Math.random() - 0.5);
  const selectedGroups = shuffledGroups.slice(0, count);

  const picks = selectedGroups.map((group) => pickOne(group.pictures));

  // 뽑힌 그림들의 순서도 한 번 더 섞어서 매번 위치가 다르게 보이도록 합니다
  return picks.sort(() => Math.random() - 0.5);
}

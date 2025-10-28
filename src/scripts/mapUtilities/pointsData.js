export const imagesDescsLinks = {
  stores: [
    {
      lat: 34.98493616431302,
      lng: 135.75248977767515,
      imageSrc:
        'https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg',
      desc: '京都コンピュータ学院は1963年に創立された日本で最初のコンピュータ教育機関である。京都大学理学部（多くは宇宙物理学教室）出身の有志により設立された。',
      link: 'https://ja.wikipedia.org/wiki/%E4%BA%AC%E9%83%BD%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF%E5%AD%A6%E9%99%A2',
    },
    {
      lat: 34.9895,
      lng: 135.7617,
      imageSrc:
        'https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg',
      desc: '東京にある最新のコンピュータ教育施設。最先端の設備を備えています。',
      link: 'https://example.com/tokyo-store',
    },
  ],
  konbinis: [
    {
      lat: 34.985,
      lng: 135.753,
      imageSrc:
        'https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg',
      desc: '24時間営業のコンビニエンスストア。軽食や飲み物が充実。',
      link: 'https://example.com/konbini1',
    },
    {
      lat: 34.986,
      lng: 135.754,
      imageSrc:
        'https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg',
      desc: '駅前の便利なコンビニ。コピー機やATMも完備。',
      link: 'https://example.com/konbini2',
    },
  ],
  malls: [
    {
      lat: 34.987,
      lng: 135.755,
      imageSrc:
        'https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg',
      desc: '大型ショッピングモール。ファッション、飲食、エンターテイメントが揃う。',
      link: 'https://example.com/shopping-mall',
    },
  ],
  repair: [
    {
      lat: 34.9845,
      lng: 135.7515,
      imageSrc:
        'https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg',
      desc: 'パソコン・スマートフォン修理専門店。迅速な対応が特徴。',
      link: 'https://example.com/repair-shop',
    },
    {
      lat: 34.9835,
      lng: 135.7505,
      imageSrc:
        'https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg',
      desc: '家電製品の修理センター。各種家電のメンテナンスを行います。',
      link: 'https://example.com/repair-center',
    },
  ],
};

/// Methods to get data from the object
export const DataAccess = {
  // Get all items of a specific category
  getCategoryItems: (category) => imagesDescsLinks[category] || [],

  // Get all items from all categories
  getAllItems: () => {
    const allItems = [];
    Object.values(imagesDescsLinks).forEach((category) => {
      allItems.push(...category);
    });
    return allItems;
  },

  // Get items by coordinates (within a certain radius)
  getItemsByLocation: (lat, lng, radius = 0.01) => {
    const nearbyItems = [];
    Object.values(imagesDescsLinks).forEach((category) => {
      category.forEach((item) => {
        const distance = Math.sqrt(
          (item.lat - lat) ** 2 + (item.lng - lng) ** 2,
        );
        if (distance <= radius) {
          nearbyItems.push(item);
        }
      });
    });
    return nearbyItems;
  },

  // Get items that contain specific text in description
  searchItemsByText: (searchText) => {
    const results = [];
    const searchLower = searchText.toLowerCase();

    Object.values(imagesDescsLinks).forEach((category) => {
      category.forEach((item) => {
        if (item.desc.toLowerCase().includes(searchLower)) {
          results.push(item);
        }
      });
    });
    return results;
  },

  // Get categories with their item counts
  getCategoryStats: () => {
    const stats = {};
    Object.keys(imagesDescsLinks).forEach((category) => {
      stats[category] = imagesDescsLinks[category].length;
    });
    return stats;
  },

  // Get unique coordinates from all items
  getAllCoordinates: () => {
    const coordinates = [];
    Object.values(imagesDescsLinks).forEach((category) => {
      category.forEach((item) => {
        coordinates.push({ lat: item.lat, lng: item.lng });
      });
    });
    return coordinates;
  },

  // Add new item to a category
  addItem: (category, newItem) => {
    if (imagesDescsLinks[category]) {
      imagesDescsLinks[category].push(newItem);
      return true;
    }
    return false;
  },

  // Remove item from a category by index
  removeItem: (category, index) => {
    if (imagesDescsLinks[category] && imagesDescsLinks[category][index]) {
      imagesDescsLinks[category].splice(index, 1);
      return true;
    }
    return false;
  },
};

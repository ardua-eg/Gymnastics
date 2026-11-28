// Your product list. Add one object per product.
// mode: 'stock' (in stock), 'order' (arrives in 5 to 8 weeks) or 'clearance' (add oldPrice)
// sizes: { 'size': how many you have }. A size with 0 shows as out of stock.
window.PRODUCTS = [
  {
    id: 'iwa-trampoline-shoes',
    name: 'IWA Trampoline Shoes',
    brand: 'IWA',
    cat: 'Accessories',
    type: 'Shoes',
    mode: 'stock',
    price: 1400,
    img: 'products/iwa-trampoline-shoes.jpg',
    sizes: { '33': 1, '34': 1, '35': 1, '36': 2, '37': 0, '38': 2, '39': 2, '40': 3, '41': 3, '42': 2, '43': 1, '44': 0, '45': 0 }
  },
  {
    id: 'tiger-paw-wrist-supports',
    name: 'Premium Wrist Supports',
    brand: 'Tiger Paw',
    cat: 'Accessories',
    type: 'Others',
    mode: 'stock',
    price: 3500,
    img: 'products/tiger-paw-wrist-supports.jpg',
    sizes: { 'S': 1, 'M': 1, 'L': 2 }
  },
  {
    id: 'iwa-wrist-support',
    name: 'IWA Wrist Support',
    brand: 'IWA',
    cat: 'Accessories',
    type: 'Others',
    mode: 'stock',
    price: 2700,
    img: 'products/iwa-wrist-support.jpg',
    sizes: { 'S': 0, 'M': 0, 'L': 1 }
  },
  {
    id: 'reisport-grips',
    name: 'Reisport Ladies Grips (Swiss made)',
    brand: 'Reisport',
    cat: 'Accessories',
    type: 'Grips',
    mode: 'stock',
    price: 3100,
    img: 'products/reisport-grips.jpg',
    sizes: { 'GR00': 0, 'GR0': 2, 'GR1': 0, 'GR2': 0, 'GR3': 0 },
    guide: {
      title: 'Grip size guide',
      text: 'Measure your hand in cm, from the tip of the middle finger in a straight line to the first line at the start of the wrist.',
      img: 'products/grip-size-hand.jpg',
      rows: [['13 to 13.9 cm', 'GR00'], ['14 to 14.9 cm', 'GR0'], ['15 to 16.4 cm', 'GR1'], ['16.5 to 17.3 cm', 'GR2'], ['17.4 to 18.9 cm', 'GR3']]
    }
  },
  {
    id: 'reisport-rings-grips',
    name: 'Reisport Boys Rings Grips (Swiss made)',
    brand: 'Reisport',
    cat: 'Accessories',
    type: 'Grips',
    mode: 'stock',
    price: 3100,
    img: 'products/reisport-rings-grips.jpg',
    sizes: { 'GR0': 1, 'GR1': 1, 'GR2': 1, 'GR3': 0 },
    guide: {
      title: 'Grip size guide',
      text: 'Measure your hand in cm, from the tip of the middle finger in a straight line to the first line at the start of the wrist.',
      img: 'products/grip-size-hand.jpg',
      rows: [['14 to 14.9 cm', 'GR0'], ['15 to 16.4 cm', 'GR1'], ['16.5 to 17.9 cm', 'GR2'], ['18 to 19.9 cm', 'GR3']]
    }
  },
  {
    id: 'reisport-bar-grips',
    name: 'Reisport Boys Bar Grips (Swiss made)',
    brand: 'Reisport',
    cat: 'Accessories',
    type: 'Grips',
    mode: 'stock',
    price: 3100,
    img: 'products/reisport-bar-grips.jpg',
    sizes: { 'GR0': 2, 'GR1': 0, 'GR2': 0, 'GR3': 0 },
    guide: {
      title: 'Grip size guide',
      text: 'Measure your hand in cm, from the tip of the middle finger in a straight line to the first line at the start of the wrist.',
      img: 'products/grip-size-hand.jpg',
      rows: [['14 to 14.9 cm', 'GR0'], ['15 to 16.4 cm', 'GR1'], ['16.5 to 17.9 cm', 'GR2'], ['18 to 19.9 cm', 'GR3']]
    }
  },
  {
    id: 'agiva-wristbands',
    name: 'Agiva Gymnast Wristbands',
    brand: 'Agiva',
    cat: 'Accessories',
    type: 'Others',
    mode: 'stock',
    price: 550,
    stock: 1,
    img: 'products/agiva-wristbands.jpg'
  },
  {
    id: 'moreau-bag-orange',
    name: 'Moreau Drawstring Bag (Orange / Purple)',
    brand: 'Moreau',
    cat: 'Accessories',
    type: 'Bags',
    mode: 'stock',
    price: 650,
    stock: 1,
    img: 'products/moreau-bag-orange.jpg'
  },
  {
    id: 'moreau-bag-blue',
    name: 'Moreau Drawstring Bag (Blue / Green)',
    brand: 'Moreau',
    cat: 'Accessories',
    type: 'Bags',
    mode: 'stock',
    price: 650,
    stock: 1,
    img: 'products/moreau-bag-blue.jpg'
  },
  {
    id: 'agiva-scrunchies',
    name: 'Agiva Scrunchies',
    brand: 'Agiva',
    cat: 'Accessories',
    type: 'Others',
    mode: 'stock',
    price: 100,
    img: 'products/agiva-scrunchies.jpg',
    optionLabel: 'Colour',
    sizes: { 'Lime green': 1, 'White': 1, 'White sparkle': 1, 'Red': 1, 'Pink': 1, 'Turquoise': 1, 'Orange': 0 }
  },
  {
    id: 'royal-leotard-pink',
    name: 'Royal Leotard (Pink / Grey)',
    brand: 'Royal',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    price: 4200,
    oldPrice: 4500,
    img: 'products/royal-leotard-front.jpg',
    img2: 'products/royal-leotard-back.jpg',
    sizes: { 'Adult S': 1, 'Adult M': 1 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest: arms held out, deep breath. Waist: at the natural waistline. Torso: from the centre of the shoulder down the front, through the crotch and up the back to the start.',
      head: ['Size', 'Chest', 'Waist', 'Torso'],
      rows: [
        ['Child S (CSM)', '56-61', '40-45', '92-97'],
        ['Intermediate (INT)', '59-66', '45-50', '97-107'],
        ['Child M (CME)', '61-71', '50-55', '102-112'],
        ['Child L (CLA)', '66-76', '55-60', '107-117'],
        ['Adult XS (AXS)', '71-81', '60-65', '117-127'],
        ['Adult S (ASM)', '78-86', '65-70', '125-132'],
        ['Adult M (AME)', '86-92', '70-75', '132-144'],
        ['Adult L (ALA)', '92-98', '75-80', '138-152']
      ]
    }
  },
  {
    id: 'moreau-leotard-blue',
    name: 'Moreau Leotard',
    brand: 'Moreau',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    sale: true,
    price: 1550,
    oldPrice: 1800,
    img: 'products/moreau-leotard.jpg',
    sizes: { 'Adult XS': 8 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest, waist and hips are measured around the body. Torso is from the shoulder down through the crotch and back up.',
      head: ['Size', 'Chest', 'Waist', 'Hips', 'Torso'],
      rows: [
        ['Age 8', '61-66', '46-49', '52-58', '112-119'],
        ['Age 10', '65-69', '49-52', '55-61', '118-125'],
        ['Age 12', '69-73', '52-55', '58-64', '123-130'],
        ['Age 14', '72-76', '56-59', '61-67', '129-136'],
        ['Size 0', '75-80', '59-62', '64-70', '135-142'],
        ['Size 1', '80-85', '62-65', '69-75', '141-160'],
        ['Size 2', '85-89', '65-68', '73-79', '147-164'],
        ['Size 3', '89-100', '68-76', '76-88', '153-168']
      ]
    }
  },
  {
    id: 'moreau-leotard-royal-blue',
    name: 'Moreau Leotard (Blue)',
    brand: 'Moreau',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    sale: true,
    price: 1550,
    oldPrice: 1800,
    img: 'products/moreau-leotard-royal-blue.jpg',
    sizes: { 'Adult XS': 1 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest, waist and hips are measured around the body. Torso is from the shoulder down through the crotch and back up.',
      head: ['Size', 'Chest', 'Waist', 'Hips', 'Torso'],
      rows: [
        ['Age 8', '61-66', '46-49', '52-58', '112-119'],
        ['Age 10', '65-69', '49-52', '55-61', '118-125'],
        ['Age 12', '69-73', '52-55', '58-64', '123-130'],
        ['Age 14', '72-76', '56-59', '61-67', '129-136'],
        ['Size 0', '75-80', '59-62', '64-70', '135-142'],
        ['Size 1', '80-85', '62-65', '69-75', '141-160'],
        ['Size 2', '85-89', '65-68', '73-79', '147-164'],
        ['Size 3', '89-100', '68-76', '76-88', '153-168']
      ]
    }
  },
  {
    id: 'moreau-leotard-green',
    name: 'Moreau Leotard (Green)',
    brand: 'Moreau',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    sale: true,
    price: 1550,
    oldPrice: 1800,
    img: 'products/moreau-leotard-green.jpg',
    sizes: { 'Adult XS': 1, 'CL': 1 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest, waist and hips are measured around the body. Torso is from the shoulder down through the crotch and back up.',
      head: ['Size', 'Chest', 'Waist', 'Hips', 'Torso'],
      rows: [
        ['Age 8', '61-66', '46-49', '52-58', '112-119'],
        ['Age 10', '65-69', '49-52', '55-61', '118-125'],
        ['Age 12', '69-73', '52-55', '58-64', '123-130'],
        ['Age 14', '72-76', '56-59', '61-67', '129-136'],
        ['Size 0', '75-80', '59-62', '64-70', '135-142'],
        ['Size 1', '80-85', '62-65', '69-75', '141-160'],
        ['Size 2', '85-89', '65-68', '73-79', '147-164'],
        ['Size 3', '89-100', '68-76', '76-88', '153-168']
      ]
    }
  },
  {
    id: 'moreau-long-sleeve-teal',
    name: 'Moreau Long Sleeve Leotard',
    brand: 'Moreau',
    cat: 'Women',
    type: 'Long sleeve',
    mode: 'stock',
    price: 2500,
    img: 'products/moreau-long-sleeve.jpg',
    sizes: { 'Adult XS': 1 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest, waist and hips are measured around the body. Torso is from the shoulder down through the crotch and back up.',
      head: ['Size', 'Chest', 'Waist', 'Hips', 'Torso'],
      rows: [
        ['Age 8', '61-66', '46-49', '52-58', '112-119'],
        ['Age 10', '65-69', '49-52', '55-61', '118-125'],
        ['Age 12', '69-73', '52-55', '58-64', '123-130'],
        ['Age 14', '72-76', '56-59', '61-67', '129-136'],
        ['Size 0', '75-80', '59-62', '64-70', '135-142'],
        ['Size 1', '80-85', '62-65', '69-75', '141-160'],
        ['Size 2', '85-89', '65-68', '73-79', '147-164'],
        ['Size 3', '89-100', '68-76', '76-88', '153-168']
      ]
    }
  },
  {
    id: 'moreau-leotard-purple',
    name: 'Moreau Leotard (Blue / Purple)',
    brand: 'Moreau',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    price: 1550,
    img: 'products/moreau-leotard-purple.jpg',
    sizes: { 'CM': 10, 'Adult S': 3 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest, waist and hips are measured around the body. Torso is from the shoulder down through the crotch and back up.',
      head: ['Size', 'Chest', 'Waist', 'Hips', 'Torso'],
      rows: [
        ['Age 8', '61-66', '46-49', '52-58', '112-119'],
        ['Age 10', '65-69', '49-52', '55-61', '118-125'],
        ['Age 12', '69-73', '52-55', '58-64', '123-130'],
        ['Age 14', '72-76', '56-59', '61-67', '129-136'],
        ['Size 0', '75-80', '59-62', '64-70', '135-142'],
        ['Size 1', '80-85', '62-65', '69-75', '141-160'],
        ['Size 2', '85-89', '65-68', '73-79', '147-164'],
        ['Size 3', '89-100', '68-76', '76-88', '153-168']
      ]
    }
  },
  {
    id: 'moreau-leotard-flower',
    name: 'Moreau Leotard (Flower)',
    brand: 'Moreau',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    price: 1550,
    img: 'products/moreau-leotard-flower.jpg',
    sizes: { 'Adult XS': 2 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest, waist and hips are measured around the body. Torso is from the shoulder down through the crotch and back up.',
      head: ['Size', 'Chest', 'Waist', 'Hips', 'Torso'],
      rows: [
        ['Age 8', '61-66', '46-49', '52-58', '112-119'],
        ['Age 10', '65-69', '49-52', '55-61', '118-125'],
        ['Age 12', '69-73', '52-55', '58-64', '123-130'],
        ['Age 14', '72-76', '56-59', '61-67', '129-136'],
        ['Size 0', '75-80', '59-62', '64-70', '135-142'],
        ['Size 1', '80-85', '62-65', '69-75', '141-160'],
        ['Size 2', '85-89', '65-68', '73-79', '147-164'],
        ['Size 3', '89-100', '68-76', '76-88', '153-168']
      ]
    }
  },
  {
    id: 'royal-leotard-coral',
    name: 'Royal Leotard (Coral / Black)',
    brand: 'Royal',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    price: 2900,
    oldPrice: 4300,
    img: 'products/royal-leotard-coral.jpg',
    sizes: { 'Child L': 1, 'Adult XS': 1 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest: arms held out, deep breath. Waist: at the natural waistline. Torso: from the centre of the shoulder down the front, through the crotch and up the back to the start.',
      head: ['Size', 'Chest', 'Waist', 'Torso'],
      rows: [
        ['Child S (CSM)', '56-61', '40-45', '92-97'],
        ['Intermediate (INT)', '59-66', '45-50', '97-107'],
        ['Child M (CME)', '61-71', '50-55', '102-112'],
        ['Child L (CLA)', '66-76', '55-60', '107-117'],
        ['Adult XS (AXS)', '71-81', '60-65', '117-127'],
        ['Adult S (ASM)', '78-86', '65-70', '125-132'],
        ['Adult M (AME)', '86-92', '70-75', '132-144'],
        ['Adult L (ALA)', '92-98', '75-80', '138-152']
      ]
    }
  },
  {
    id: 'royal-leotard-teal',
    name: 'Royal Leotard (Teal / Black)',
    brand: 'Royal',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    price: 2900,
    oldPrice: 4300,
    img: 'products/royal-leotard-teal.jpg',
    sizes: { 'Adult S': 1 },
    guide: {
      title: 'Size guide (cm)',
      text: 'Chest: arms held out, deep breath. Waist: at the natural waistline. Torso: from the centre of the shoulder down the front, through the crotch and up the back to the start.',
      head: ['Size', 'Chest', 'Waist', 'Torso'],
      rows: [
        ['Child S (CSM)', '56-61', '40-45', '92-97'],
        ['Intermediate (INT)', '59-66', '45-50', '97-107'],
        ['Child M (CME)', '61-71', '50-55', '102-112'],
        ['Child L (CLA)', '66-76', '55-60', '107-117'],
        ['Adult XS (AXS)', '71-81', '60-65', '117-127'],
        ['Adult S (ASM)', '78-86', '65-70', '125-132'],
        ['Adult M (AME)', '86-92', '70-75', '132-144'],
        ['Adult L (ALA)', '92-98', '75-80', '138-152']
      ]
    }
  },
  {
    id: 'alpha-factor-red',
    name: 'Alpha Factor Long Sleeve Leotard (Red)',
    brand: 'Alpha Factor',
    cat: 'Women',
    type: 'Long sleeve',
    mode: 'stock',
    price: 1950,
    img: 'products/alpha-factor-red.jpg',
    sizes: { 'Child L': 1, 'Adult XS': 1 }
  },
  {
    id: 'alpha-factor-purple',
    name: 'Alpha Factor Long Sleeve Leotard (Purple)',
    brand: 'Alpha Factor',
    cat: 'Women',
    type: 'Long sleeve',
    mode: 'stock',
    price: 2500,
    img: 'products/alpha-factor-purple.jpg',
    sizes: { 'Child L': 1 }
  },
  {
    id: 'snowflake-leotard-black',
    name: 'Snowflake Leotard (Black Lace)',
    brand: 'Snowflake Designs',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    price: 2500,
    img: 'products/snowflake-leotard-black.jpg'
  },
  {
    id: 'agiva-leotard-pink',
    name: 'Agiva Leotard (Pink)',
    brand: 'Agiva',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    price: 2800,
    img: 'products/agiva-leotard-pink.jpg',
    sizes: { '8 years': 1, '10 years': 1 },
    guide: {
      title: 'Size guide',
      text: 'Choose by height. Waist is in cm.',
      head: ['Size', 'Height (cm)', 'Ladies size', 'Waist (cm)'],
      rows: [
        ['4 years', '104', '4 years', '45'],
        ['6 years', '116', '6 years', '50'],
        ['8 years', '128', '8 years', '55'],
        ['10 years', '140', '10 years', '60'],
        ['12 years', '152', '12 years', '65'],
        ['14 years', '164', '14 years', '70'],
        ['XS', '-', '36', '-'],
        ['S', '168', '38', '75'],
        ['M', '172', '40', '80'],
        ['L', '176', '42', '85'],
        ['XL', '180', '44', '90'],
        ['XXL', '184', '46', '95'],
        ['3XL', '188', '48', '100'],
        ['4XL', '192', '50', '105'],
        ['5XL', '-', '52', '110'],
        ['6XL', '-', '54', '115']
      ]
    }
  },
  {
    id: 'pink-leotard-black',
    name: 'Pink Leotard (Black)',
    brand: 'Pink',
    cat: 'Women',
    type: 'Leotard',
    mode: 'stock',
    price: 2500,
    img: 'products/pink-leotard-black.jpg',
    sizes: { 'Adult XS': 1 }
  }
];

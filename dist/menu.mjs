// Preise in Cent: Grundlage ist die überlieferte Speisekarte aus Praktikum 2.
const pizza = (id, name, description, small, large) => ({ id, name, description, category: 'pizza', variants: [{ label: '26 cm', cents: small }, { label: '35 cm', cents: large }] });
const pasta = (id, name, description, cents) => ({ id, name, description, category: 'pasta', variants: [{ label: 'Portion', cents }] });
const drink = (id, name, label, cents) => ({ id, name, description: label, category: 'drinks', variants: [{ label, cents }] });
export const menu = [
  pizza('pizzabrot', 'Pizzabrot', 'Der kleine Anfang für einen guten Abend.', 320, 480),
  pizza('margherita', 'Margherita', 'Tomate und Käse. Einfach ein Klassiker.', 680, 1150),
  pizza('salami', 'Salami', 'Für alle, die es klassisch und herzhaft mögen.', 750, 1260),
  pizza('prosciutto', 'Prosciutto', 'Mit Vorderschinken.', 750, 1260),
  pizza('peperoniwurst', 'Peperoniwurst', 'Herzhafter Belag mit Peperoniwurst.', 750, 1260),
  pizza('funghi', 'Funghi', 'Mit Pilzen – unkompliziert gut.', 750, 1140),
  pizza('salami-peperoni', 'Salami & Peperoniwurst', 'Zwei herzhafte Lieblingszutaten auf einer Pizza.', 780, 1300),
  pizza('venezia', 'Venezia', 'Vorderschinken und Mozzarella.', 800, 1300),
  pizza('florenz', 'Florenz', 'Salami und Mozzarella.', 800, 1300),
  pizza('julian', 'Julian', 'Zwiebeln, Paprika und Pilze.', 760, 1290),
  pasta('tortelloni-lachs', 'Tortelloni mit Lachs', 'Gefüllte Pasta mit Lachs.', 1250),
  pasta('tortelloni-pilze', 'Tortelloni mit Pilzen', 'Gefüllte Pasta mit Pilzen.', 1250),
  pasta('bolognese', 'Spaghetti Bolognese', 'Der Klassiker mit Bolognesesauce.', 760),
  pasta('napoli', 'Spaghetti Napoli', 'Spaghetti mit Tomatensauce.', 610),
  pasta('garnelen', 'Spaghetti mit Garnelen', 'Pasta für alle, die Meeresfrüchte lieben.', 1280),
  pasta('arrabbiata', 'Spaghetti Arrabbiata', 'Tomatensauce mit einer scharfen Note.', 910),
  pasta('siciliana', 'Spaghetti alla Siciliana', 'Pasta auf sizilianische Art.', 910),
  pasta('lasagne', 'Lasagne', 'Schicht für Schicht ein Lieblingsgericht.', 990),
  pasta('carbonara', 'Rigatoni Carbonara', 'Rigatoni auf Carbonara-Art.', 1050),
  pasta('spinat', 'Rigatoni mit Spinat', 'Rigatoni mit Spinat.', 1080),
  drink('sprite', 'Sprite', '0,2 l', 270), drink('fanta', 'Fanta', '0,2 l', 270),
  drink('cola-gross', 'Cola', '0,4 l', 400), drink('cola-klein', 'Cola', '0,2 l', 270),
  drink('spezi-gross', 'Spezi', '0,4 l', 400), drink('spezi-klein', 'Spezi', '0,2 l', 270),
  drink('wasser', 'Stilles Wasser', '0,2 l', 180), drink('bitter-lemon', 'Bitter Lemon', '0,2 l', 300),
  drink('tonic', 'Tonic Water', '0,2 l', 300), drink('apfelsaft', 'Apfelsaft', '0,2 l', 290),
  drink('bier', 'Bier', '0,5 l', 450), drink('radler', 'Radler', '0,5 l', 450),
  drink('weissbier', 'Weißbier', '0,5 l', 500), drink('prosecco', 'Prosecco', '0,2 l', 650),
  drink('rotwein', 'Rotwein', '0,2 l', 600), drink('weisswein', 'Weißwein', '0,2 l', 600),
  drink('aperol', 'Aperol Spritz', '0,4 l', 850), drink('gin-tonic', 'Gin Tonic', '0,4 l', 900),
  drink('wodka-lemon', 'Wodka Lemon', '0,4 l', 850), drink('rum-cola', 'Rum Cola', '0,4 l', 850),
];
export const categories = [{ id: 'pizza', label: 'Pizza', note: '26 oder 35 cm · Du entscheidest.' }, { id: 'pasta', label: 'Pasta', note: 'Für den kleinen Italien-Moment.' }, { id: 'drinks', label: 'Getränke', note: 'Das passende Glas zum guten Essen.' }];

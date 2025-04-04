const hard_word = [
    { word: "butter", hint: "Spread on bread, often yellow." },
    { word: "orange", hint: "A citrus fruit that's both a color and a taste." },
    { word: "planet", hint: "Orbits a star in space." },
    { word: "soccer", hint: "A sport played with a round ball and two goals." },
    { word: "guitar", hint: "A stringed musical instrument." },
    { word: "bridge", hint: "Connects two places over water." },
    { word: "school", hint: "Where you go to learn." },
    { word: "tomato", hint: "A red fruit often used in salads and sauces." },
    { word: "wallet", hint: "Holds your money and cards." },
    { word: "forest", hint: "A large area covered with trees." },
    { word: "ladder", hint: "Used to climb to higher places." },
    { word: "cotton", hint: "A soft material often used for clothes." },
    { word: "flower", hint: "Blooms with petals and bright colors." },
    { word: "pencil", hint: "Used for writing or drawing." },
    { word: "potato", hint: "A root vegetable used in fries." },
    { word: "gloves", hint: "Worn on hands for warmth or protection." },
    { word: "animal", hint: "A living creature, not a plant." },
    { word: "rocket", hint: "Flies into space with astronauts or satellites." },
    { word: "market", hint: "A place to buy and sell goods." },
    { word: "summer", hint: "The warmest season of the year." },
    { word: "rabbit", hint: "A small animal with long ears." },
    { word: "island", hint: "Land surrounded by water." },
    { word: "cherry", hint: "A small red fruit often on top of desserts." },
    { word: "camera", hint: "Used to take photos or videos." },
    { word: "beacon", hint: "A light used to guide or warn." },
    { word: "silver", hint: "A shiny, precious metal." },
    { word: "jungle", hint: "A dense tropical forest." },
    { word: "cookie", hint: "A sweet baked snack." },
    { word: "castle", hint: "A fortress for royalty or defense." },
    { word: "saddle", hint: "Placed on a horse for riding." },
    { word: "pirate", hint: "Sails the seas looking for treasure." },
    { word: "dragon", hint: "A mythical creature that breathes fire." },
    { word: "desert", hint: "A dry, sandy area with little rain." },
    { word: "pepper", hint: "A spicy vegetable or seasoning." },
    { word: "rocket", hint: "A spacecraft or fireworks device." },
    { word: "cotton", hint: "A fabric made from a soft plant." },
    { word: "subway", hint: "An underground train system." },
    { word: "butter", hint: "Used in cooking or on toast." },
    { word: "winter", hint: "The coldest season of the year." },
    { word: "throne", hint: "A royal seat for kings or queens." },
    { word: "planet", hint: "A celestial body orbiting a star." },
    { word: "goblin", hint: "A mischievous mythical creature." },
    { word: "friend", hint: "Someone you trust and enjoy being with." },
    { word: "beacon", hint: "A guiding or warning light." },
    { word: "wallet", hint: "Keeps your money and cards secure." },
    { word: "beetle", hint: "An insect with a hard shell." },
    { word: "stream", hint: "A small flowing body of water." },
    { word: "garden", hint: "A place to grow flowers or vegetables." },
    { word: "bucket", hint: "Used to carry water or other items." },
    { word: "anchor", hint: "Keeps a ship in place." },
    { word: "glider", hint: "A lightweight plane without an engine." },
    { word: "banjos", hint: "Stringed instruments with a circular body." },
    { word: "parrot", hint: "A colorful bird that can mimic sounds." },
    { word: "helmet", hint: "Protects your head during activities." },
    { word: "stripe", hint: "A long, narrow band of color." },
    { word: "shadow", hint: "A dark area where light is blocked." },
    { word: "orange", hint: "Both a fruit and a color." },
    { word: "tunnel", hint: "A passageway through or under something." },
    { word: "locker", hint: "A secure place to store items." },
    { word: "picnic", hint: "An outdoor meal on a blanket." },
    { word: "coffin", hint: "A box for burial." },
    { word: "voyage", hint: "A long journey, often by sea." },
    { word: "packet", hint: "A small container or bundle." },
    { word: "poster", hint: "A large printed display for walls." },
    { word: "lantern", hint: "A portable light source." },
    { word: "stitch", hint: "A single loop in sewing or knitting." },
    { word: "zipper", hint: "A fastener for clothes or bags." },
    { word: "hunger", hint: "The need or desire for food." },
    { word: "hammer", hint: "A tool used for driving nails." },
    { word: "stride", hint: "A confident and purposeful walk." },
    { word: "ladder", hint: "Used to climb to higher places." },
    { word: "pillow", hint: "Rest your head on it while sleeping." },
    { word: "market", hint: "A place where goods are bought or sold." },
    { word: "puddle", hint: "A small pool of liquid on the ground." },
    { word: "breeze", hint: "A gentle and light wind." },
    { word: "planet", hint: "Orbits a star in a solar system." },
    { word: "cheese", hint: "Made from milk, often yellow or white." },
    { word: "cactus", hint: "A spiky plant found in deserts." },
    { word: "muffin", hint: "A small, sweet baked treat." },
    { word: "beacon", hint: "A light used to warn or guide." },
    { word: "quartz", hint: "A common mineral, often clear or white." },
    { word: "jigsaw", hint: "A type of puzzle with many pieces." },
    { word: "planet", hint: "A large celestial body orbiting a star." },
    { word: "pickle", hint: "A cucumber preserved in vinegar." },
    { word: "velvet", hint: "A soft and smooth fabric." },
    { word: "hazard", hint: "Something that can cause harm." },
    { word: "stream", hint: "A small, flowing body of water." },
    { word: "pepper", hint: "A spicy seasoning or vegetable." },
    { word: "beacon", hint: "A signal light or guiding tower." },
    { word: "banana", hint: "A yellow fruit that's often curved." },
    { word: "sleigh", hint: "Pulled by reindeer in snowy areas." },
    { word: "button", hint: "Fastens clothes or activates devices." },
    { word: "tunnel", hint: "An underground passage or road." },
    { word: "window", hint: "Allows light and air into a room." },
    { word: "throne", hint: "A royal chair for kings or queens." },
    { word: "bridge", hint: "Spans a gap, often over water." },
    { word: "ticket", hint: "Allows entry to events or travel." },
    { word: "parrot", hint: "A bird known for mimicking sounds." },
    { word: "hammer", hint: "Used to hit nails into wood." },
    { word: "socket", hint: "Provides power for electronic devices." },
    { word: "planet", hint: "A celestial body orbiting a star." },
];

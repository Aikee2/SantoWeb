document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleLayout");
  const layoutIcon = document.getElementById("layoutIcon");
  const saintsGrid = document.querySelector(".saints-grid");

  // start in cards layout
  let isList = false;

  // make sure grid has the correct initial class
  saintsGrid.classList.add("cards-layout");
  layoutIcon.src = "Files/Images/cards.png";

  toggleBtn.addEventListener("click", () => {
    isList = !isList; // toggle state

    saintsGrid.classList.toggle("list-layout", isList);
    saintsGrid.classList.toggle("cards-layout", !isList);

    layoutIcon.src = isList 
      ? "Files/Images/list.png" 
      : "Files/Images/cards.png";

    layoutIcon.classList.toggle("active", isList);
  });
});

// ================= TAB SYSTEM (SAFE VERSION) =================

const tabs = document.querySelectorAll(".tab");

const sections = {
  Saints: document.querySelector(".saints-container"),
  Prayers: document.querySelector(".prayers-container"),
  Schedules: document.querySelector(".schedules-container")
};

function hideAllSections() {
  Object.values(sections).forEach(section => {
    if (section) section.style.display = "none";
  });

  tabs.forEach(tab => tab.classList.remove("active-tab"));
}

// Detect tab click by text
tabs.forEach(tab => {

  if (tab.classList.contains("title")) return;

  tab.addEventListener("click", () => {

    const tabName = tab.textContent.trim();

    hideAllSections();

    if (sections[tabName]) {
      sections[tabName].style.display = "block";

      if (tabName === "Schedules") {
        goToCurrentMonth();
      }
    }

    tab.classList.add("active-tab");
  });

});

// Default tab on load
document.addEventListener("DOMContentLoaded", () => {

  hideAllSections();

  if (sections["Saints"]) {
    sections["Saints"].style.display = "block";
  }

});

const cards = document.querySelectorAll('.saint-card');
const overlay = document.querySelector('.selected-saint');
const titleEl = document.querySelector('.info-title');
const subEl = document.querySelector('.info-sub');
const feastEl = document.querySelector('.info-feast');
const descEl = document.querySelector('.info-desc');

let scrollPosition = 0;

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

function disableBodyScroll() {
    document.documentElement.style.overflow = 'hidden';
    scrollPosition = window.scrollY;
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.paddingRight = `${scrollbarWidth}px`; // 👈 prevent content shift
}

function enableBodyScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, scrollPosition);
}

// 🔥 Show separator when description is scrolled
const separator = document.querySelector('.info-separator');

descEl.addEventListener('scroll', () => {
    if (descEl.scrollTop > 5) {
        separator.style.opacity = '1';
    } else {
        separator.style.opacity = '0';
    }
});

// 🔥 Show separator when prayer is scrolled
const prayerSeparator = document.querySelector('.prayer-separator');
const prayerContent = document.querySelector('.prayer-content');

prayerContent.addEventListener('scroll', () => {
    if (prayerContent.scrollTop > 5) {
        prayerSeparator.style.opacity = '1';
    } else {
        prayerSeparator.style.opacity = '0';
    }
});

let activeClone = null;
let originalRect = null;
let isOpen = false;

// 👑 Saint data object
const saintsData = {
  "St. Agnes of Rome": {
    nick: "(San Ines)",
    sub: "Patron Saint of Chastity",
    feast: "Feast Day: January 21",
    desc: `Agnes is a beautiful girl who suffered martyrdom at the young age of thirteen. She was born of Roman nobility in 291. She was so beautiful that many young men wished to marry her, including Procop, the governor's son. Agnes refused them all by saying "Jesus Christ is my only Spouse."
Procop brought her expensive gifts, including bracelets of gold, rare jewels and precious ornaments and promised her all the lavishness if she would only agree to be his wife. She rejected him by saying, "I am already betrothed to a lover who is greater and fairer than any earthly suitor... I have tasted the milk and honey of his lips, and the music of his divine voice has sounded my ears. He is so fair that the sun and moon are ravished by his beauty, and so mighty that the angels of heaven are his servants!"
Upon hearing this, Procop became very sick and told his father that he would die if he will not be with Agnes. When the governor wasn't able to convince Agnes to marry his son, he had the soldiers drag her and stripped of her garments. Being naked, hair suddenly started to cover her body and then a white and shining garment clothed her.
The people who surrounded Agnes accused her of being a witch. People kindled a fire and threw Agnes in it. Miraculously, Agnes was not harmed while the executioners were slain by the force of fire. Another executioner killed Agnes by striking a sword on her. She died on 21st of January 304.
Her parents took her body and laid her in a tomb. As the people were praying by her sepulcher, Agnes appeared before them. She was radiant and is whiter than snow. Beside her was a lamb. She told her parents not to cry, for she is by the side of the Lord.
The name Agnes means lamb, or "agnus" in Latin. This would explain why she is depicted with a lamb. In Greek, the name is an adjective meaning "chaste, pure and sacred."`
  },
  "St. Anne": {
    sub: "", // no explicit patron info given
    feast: "Feast Day: July 26", // we can pull this from the text
    nick: "(Santa Ana)",
    desc: `Saint Anne is the mother of the Blessed Virgin Mary, although she was not named nor mentioned in the Bible. The name Anne is the Greek translation of "Hannah", a Hebrew word which means favor or grace.
The sister of Anne was Sobe, who is the mother of Saint Elizabeth, mother of Saint John the Baptist. She is represented as a mature woman holding a book, apparently to teach Mary to read.
She is the patroness of Quebec, Canada.`
  },
  "St. Anthony of Egypt": {
    nick: "(San Antonio Abad)",
    sub: "Patron Saint of Swineherds",
    feast: "Feast Day: January 17",
    desc: `Saint Anthony of Egypt was born in Coma, Egypt. When he was 20, his parents died and inherited the latter's possession. Anthony was so moved by the Gospel message in Mark 10:21, "Go and sell everything you have. Give the money to those who are poor..." that he sold most of his inheritance and kept only enough to support his sister and himself. He distributed the money to the poor.
At age 35, Anthony became a hermit. He crossed the Nile river and lived on a mountain. He stayed there for decades without seeing anyone. Anthony underwent a series of temptations usually associated with the hermit life. He lived by gardening and mat-making, in character he combined severe austerity with an emphasis on discretion and the love of God before all else.
According to legends, Satan tempted Anthony. He was afflicted with boredom, laziness and beautiful women. He overcame the allure of sin through deep prayer and fasting. Satan then subjected Anthony to pain by beating him mercilessly. Anthony survived with the help of another hermit.
Anthony is portrayed in the arts as having a hog in his side. The swine represents Satan whose temptations Anthony resisted through piety and faith.`
  },
  "St. Anthony of Padua": {
    nick: "(San Antonio de Padua)",
    sub: "Patron Saint of Seeker of Lost Articles, Poor People, Pregnant Women and Travelers",
    feast: "Feast Day: June 13",
    desc: `Saint Anthony of Padua was a Franciscan friar and priest. Born at Lisbon of a noble family, he joined the Order of Ustin Canons at the age of about 16. He studied at Coimbra under teachers from Montpellier, Toulouse and Paris.
Anthony lived a life of solitude until his gift for preaching was accidentally discovered. He accompanied the Father Provincial to an ordination ceremony in Forli, Italy. The scheduled preacher did not arrive and nobody volunteered to fill his role. The Father Provincial asked Anthony to speak whatever came to his mind. He gave an incredible performance, demonstrating the depth of his knowledge of the scriptures and speaking eloquently and passionately. It was the chance opportunity that changed Anthony's calling.
Elected Provincial of northern Italy in 1227, he travelled much for the supervision of the friaries under his charge. During these three years, he wrote his "Sermons for Sundays" and became a member of a commission sent to Rome to discuss with the papacy the Rule and the Testament of Francis. At the papal court, his preaching was hailed as a "jewel case of the Bible." He was commissioned to produce the "Sermons for Feast Days."
Since the 17th century he has been frequently invoked as the finder of lost articles, because a novice who borrowed his psalter without permission was obliged to return it because of a fearsome apparition.
Saint Anthony is shown here holding the child Jesus, who appeared to him while he was writing his collection of sermons.`
  },
  "St. Bartholomew": {
    nick: "(Sab Bartolome)",
    sub: "Patron Saint of the Tanners and Those who Work at Skins",
    feast: "Feast Day: August 24",
    desc: `Bartholomew is one of Jesus' apostles and was born in the first century AD. No word or act was attributed to him, but he was mentioned in the Gospels (Matthew 10:3, Mark 3:18 and Luke 6:14) and as one of the witnesses of the Ascension (Acts 1:13). His name means "son of Talmai."
Nothing definite was known after the crucifixion of Jesus, but it was believed that he preached in India and Armenia, where he was reputedly martyred by being burned alive. This would explain why Bartholomew is portrayed in arts as being surrounded by fire.`
  },
  "St. Bernardine of Siena": {
    nick: "(San Bernardino)",
    sub: "Patron Saint of Public Relations Personnel",
    feast: "Feast Day: May 20",
    desc: `Bernardine was born in the 8th of September 1380 to the noble Albizeschi family in Massa Marittima, Italy. He was left an orphan at age six and was reared by his pious aunt.
After studying civil and canon law, he joined the Confraternity of Our Lady. When he was 20, he worked in a hospital in Siena, which at that time was stricken by plague. He became a member of the Friars Minor in 1402 and belonged to one of its branches called the Observants.
He began his career as a popular preacher in Milan and later travelled all over Italy, except for Naples, on foot and sometimes preaching for three to four hours. He would prepare up to four drafts of sermon before starting to speak. Bernardine used a pulpit because of the huge crowd. His style of sermons was lively and emotional, using anecdotes, mimicry, acting and denunciation. He gave sermons on the need for penance and voluntary poverty. He also condemned gambling, usury, witchcraft, superstition and disagreements among the country's city states.`
  },
  "St. Bonaventure": {
    nick: "(San Buenaventura)",
    sub: "Patron Saint Against Intestinal Diseases",
    feast: "Feast Day: July 15",
    desc: `Bonaventure was a scholastic theologian and philosopher born in the municipality of Bagnorea in Italy in 1221. His real name was Giovanni de Fidanza, also the name of his father. He entered the Franciscan Order at the age of 22 and completed his studies in Paris, France. He received the name "Bonaventure" after entering the Franciscans. He was a friend of Saint Thomas Aquinas.
When Bonaventure was 35, he was elected Minister-General of the Franciscan Order. During the time, he has to address several issues of the order, which included the increase of numbers of friars, lack of organic and rivalry among factions.
He wrote the book "Life of Francis," the official biography of the founder of Order. All other versions of the biography were destructed.
As a Minister-General, he visited different countries that included Italy, France, Germany and England. In 1265, he was nominated by Pope Clement IV to become the archbishop of York in England, but he rejected it. In 1273, Bonaventure was nominated to become cardinal-bishop of Albano, Italy, with an order not to refuse. He was washing the dishes in the friary of Mugello when the papal messengers reached him. He told the messengers to hang the cardinal's hat on a tree nearby until he's done with his task. Bonaventure accepted the position although it was against his will.
Bonaventure died on the 15th of July 1274. The cause of death is unknown although it was believed that Bonaventure was poisoned. An ecumenical council of the Catholic church was held in France at the time of his death. He was canonized by Pope Sixtus IV in 1482.
Bonaventure can be seen wearing a cardinal's vestiture. At his back is the cardinal's red hat called "galero."`
  },
  "St. Catherine of Alexandria": {
    nick: "(Santa Catalina)",
    sub: "Patron Saint of Dying People	",
    feast: "Feast Day: November 25",
    desc: `Catherine was born in Alexandria in Egypt but its exact day or year is unknown. Her father was King Costis and Queen Sabinella. A learned woman, she studied the works of Plato and the teachings of Socrates.
She was baptized to the Christian faith by a hermit whom she saw in a dream. She denounced Emperor Maximinus for persecuting Christians. Catherine con- fronted him and his priests in an argument, often quoting the great philosophers. Maxi- minus, dumbfounded by her arguments and eloquence, uttered no word and instead sent fifty philosophers and rhetoricians to debate with her. The philosophers later became Christian converts. Enraged by their acts, Maximinus ordered them to be put on fire.
The emperor offered Catherine to be his mistress. When she refused, she was put into prison. At one point, she was visited by the empress. The empress herself and two hundred others were later converted to Christianity. The new converts were also persecuted by the emperor.
Maximinus ordered the death of Catherine. He commanded the construction of four wheels armed with sharp points and blade - two revolving in one direction and two on the opposite direction. When she was bound between the wheels, fire came down from heaven and broke the wheels in pieces. The fragments flew around, killing the executioners and three thousand people.
The emperor ordered that Catherine be carried out of the city and beheaded by sword. Angels took her body to Mount Sinai. Saint Catherine's Monastery was later established there in the sixth century.
Catherine is usually presented as having a wheel and a sword. The sword signifies the manner of her death while the wheel represents the first attempt to kill her (also known as Catherine's wheel). Her crown signifies her royalty since she was the daughter of noble parents. The palm leaves on her left hand suggests martyrdom. The head of the tyrant Maximinus is at her feet.`
  },
    "St. Clare of Assisi": {
    nick: "(Santa Clara)",
    sub: "Patron Saint for Eye Disorders",
    feast: "Feast Day: August 11",
    desc: `Clare was a beautiful noblewoman born at Assisi, Italy in 1194. She founded the Order of Poor Ladies, or Clares. Her father Favorino Scifi was a wealthy representative of an ancient Roman family, while her mother Ortolana was a very religious woman. 
When she was 18, Clare heard the preaching of Saint Francis. She was so inspired by Francis' teachings that she sought him out secretly and begged him to help her that she too might live "after the manner of the Holy Gospel." Clare and her companions soon joined Saint Francis in a chapel in Porziuncula. When Clare was with the Benedictine nuns, her father tried to convince her to marry a wealthy young man, and even tried to drag her home by force. Seeing her daughter's stance in her faith, Favorino was obliged to leave her in peace. 
Later, her younger sister Agnes joined her in the monastery, as well as other young women who wanted to be "brides of Jesus." They lived without money, wore no shoes, ate no meat and kept silent most of the time. 
In 1234, during an attack of soldiers in Assisi, Clare rose from her sleep and although sick, placed the Blessed Sacrament in front of the enemies. She knelt and prayed to God to save the Sisters. "O Lord, protect these Sisters whom I cannot protect now", she prayed. The attackers were frightened and ran away. 
Clare died in 1253 surrounded by her sister and some friends of Saint Francis. She was canonized in 1255.
Clare is portrayed as holding a ciborium, to commemorate the time the Blessed Sacrament saved her and her companions in an attack by soldiers.`
  },
    "St. Didacus of Alcala": {
    nick: "(San Diego)",
    sub: "Patron Saint of the Franciscan Lay brothers",
    feast: "Feast Day: November 12",
    desc: `Saint Didacus is also known as Saint Diego of Alcala. Didacus was born at Seville, Spain in 1400 of poor parents who placed him under the direction of a hermit living in the neighborhood. Feeling himself called to the religious life, he applied for admission to the Franciscan Order at the convent of Arrizafa and was received as a lay brother.
In 1445 he was chosen guardian of the Franciscan community on the Canary Island of Fortaventura and remained superior until he was recalled to Spain. He did a great work in preaching and converting the people of Canary to Christianity. 
At Rome he fulfilled the humble office of infirmarian in the convent of Ara Coeli and his biographers recorded the miraculous cure of many whom he attended, through his pious intercession.
He died in Alcala de Henares Spain on the 12th of November 1463. During his last moments, he asked for a cord, put it about his neck, and while holding a crucifix, he asked for forgiveness from the people who surrounded his death bed. This would explain why he is portrayed as holding a cross.`
  },
    "St. Dominic": {
    nick: "(Santo Domingo)",
    sub: "Patron Saint of the Astronomers and Falsely Accused People",
    feast: "Feast Day: August 8",
    desc: `Dominic was born in Caleruega, Spain in 1170. He was the founder of the Friars Preachers, popularly called the Domini- cans or Order of Preachers (OP), a Catholic religious order. This organization has as its motto "to praise, to bless, to preach (in Latin: laudare, benedicere, praedicare) taken from the Preface of the Blessed gin Mary in the Roman Missal.
Throughout his life, Dominic is said to have zealously practiced rigorous self- denial. He abstained from meat and observed stated fasts and periods of silence. He selected the worst accommodations and the meanest clothes, and never allowed himself the luxury of a bed. When travelling, he beguiled the journey with spiritual instruction and prayers. As soon as he passed the limits of towns and villages, he took off his shoes, and, however sharp the stones or thorns, he trudged on his way barefooted. Rain and other discomforts elicited from his lips nothing but praises to God.
Dominic envisioned communities which were centers of sacred learning, and whose members would be devoted to studying, teaching, preaching and praying.
By the time of his death in 1221, five communities or provinces were established, namely Spain, Provence, France, Lombardy and Rome.
Dominic is portrayed as having a black and white dog which is a pun for his name and the Dominicans (Domini for black and white, and canis for dog).`
  },
    "St. Francis of Assisi": {
    nick: "(San Francisco de Assisi)",
    sub: "Patron Saint of Animals",
    feast: "Feast Day: October 4",
    desc: `Francis was born at Assisi, Italy from a rich family. His father, Pietro Bernardone was a wealthy cloth merchant while her mother Pica is said to be a member of a noble family. His birth date is uncertain, though historians project the year as 1181 or 1182. Francis was baptized as Giovanni but because of his father's fondness of France, he was renamed as Francesco. 
On the 24th of February 1208, Francis was so inspired by the Gospel that right after the mass, he threw away his possessions - shoes, cloak, empty wallet and walking stick. The Gospel can be found in Matthew 10:9-10 where Jesus told his disciples, "Do not take along any gold or silver or copper in your belts; take no bag for the journey, or extra tunic, or sandals or a staff, for the worker is worth his keep." Other Assisians followed him. 
Francis wanted to seek God's will and so he opened the Bible three times. In each instance, the passages were about Christ telling his disciples to leave all things and follow Him. He saw the need to draw up a written rule when his companions had increased to 11. The Friar Minors, or being lower classes, was then established. 
It is interesting to note that, it was Francis who thought of re-creating the Nativity scene in Christmas time of 1223. Francis was also known to be a lover of nature. In one story he preached to hundreds of birds about being thankful to God for their wonderful clothes of independence and God's care. Birds stood still as he walked among them, only flying when he said they could leave. Another story involved a wolf that had been eating human beings. When the town people wanted to kill the wolf, Francis mediated and talked to the wolf to never kill again. The wolf became a pet of the community who made sure that they always had plenty of food to eat. 
He died in the 3rd of October 1226 due to his frail body cause by stigmata. He canonized in 1228. 
Francis can be seen holding a crucifix probably to symbolize Christ’s wounds which he experienced through the stigmata.`
  },
    "St. Gabriel the Archangel": {
    nick: "(San Gabriel Arkanghel)",
    sub: "Patron Saint of the Post Office, Telephone and Telegraph Workers",
    feast: "Feast Day: September 29",
    desc: `Gabriel means "man of God," or "God has shown Himself mighty." He appeared in the Bible four times. These include his message to Daniel about the fall of the Persian Empire. In Daniel 8:17, Daniel said "Gabriel came close to where I was standing. I was terrified and fell down flat with my face toward the ground. He said to me, son of man, I want you to understand that the vision tells about the time of the end." Another instance was in Daniel 9:21- 23: While I was still praying, Gabriel came to me.... He helped me understand. He said, "Daniel, I have come now to give you a good knowledge and understanding of these things. You are highly respected. So as soon as you began to pray, the Lord gave you an answer. I have come to tell you what it is...”
In the New Testament, Gabriel appeared to Zachary to foretell the birth of Saint John the Baptist. In Luke 1:19, the archangel told Zachary, "I am Gabriel. I serve God. I have been sent to speak to you and to tell you this good news."
Gabriel would later appear to Mary, a close relative of Elizabeth, the mother of Saint John the Baptist. He told Mary that she will give birth to Jesus through the power of the Holy Spirit. In Luke 1:30, Gabriel told Mary "Do not be afraid, Mary. God is very pleased with you. You will become pregnant and give birth to a son. You must name him Jesus. He will be great and will be called the Son of the Most High. The Lord God will make him a king like his father David of long ago. He will rule forever over his people, who came from Jacob's family. His kingdom will never end."
These events made Gabriel the patron of communication workers.`
  },
    "St. Ildefonso of Toledo": {
    nick: "(San Ildefonso de Toledo)",
    sub: "",
    feast: "Feast Day: January 23",
    desc: `San Ildefonso of Toledo was born in 607 from a Spanish noble family, His parents Esteban and Lucia were already old when he was born. Ildefonso is a nephew of Saint Eugenius, the arch bishop of Toledo. He was educated under the guidance of Saint Isidore of Seville.
During his younger years, he dreamt of being a monk despite opposition of his relatives. Ildefonso pursued his dream and entered a monastery in Agalia, a town near Toledo. He became a Benedic tine monk and was ordained as priest in 637, and was appointed abbot in 650 of this monastery.
He took part in the Councils of Toledo in 653 and 657. After the death of his uncle Eugenius, Ildefonso was ap-pointed as archbishop in 657, and filled in the position his uncle has left. 
Ildefonso was not only a devoted pastor but was also a notable writer and musician. He had writings about baptism ("Annotationes de cognitione baptismi"); the spiritual journey of the soul after bap tism ("De progressu spiritualis deserti") and eucharist. He also wrote "Deviris Illustribus," short biographies of worthies of the 7th century church in Spain 
He was respected by his successors be cause of his holiness and devotion for the mass. He edited the oneness of the liturgy in Spain. He is revered in the Spanish colonies up to the present as a doctor of the church because of his teachings and preachings about faith. 
His most important teaching is about the purity and virginity of the Blessed Virgin found in his book, "De Virginitate Perpetua Sanctae Mariae adversus tres in-fideles." He used this as a defense against three heretics- Helbidio, Jovinio and a Jew. This proved his deep holiness, faith and love for the Blessed Virgin Mary. He is specially remembered for his writing on the virginity of Mary, whose exuberant enthusiasm (said to be a Spanish symptom) was imitated later by others. 
A story related of Mary appearing to him on his episcopal throne and giving him a chasuble is found in most collec tions of Mary-Legends which were widely diffused from the 12th century onward During the feast of the Blessed Virgin, the clergy, including Archbishop Ilde fonso, went to the church to honor Mary with their songs.They saw a heavenly ra-diance illuminate the church. Frightened, all of them fled except for Ildefonso and two faithful deacons. With wildly beating hearts, they entered the church and made their way to the altar 
Ildefonso and the deacons saw the Immaculate Virgin seated on the Arch bishop's throne, surrounded by angels who sing songs of praise. Mary beck oned Ildefonso to approach her and said "Thou art my chaplain and faithful notary. Receive from me this chasuble which my Son sends you from His treasury." After this, the Blessed Virgin clothed Ildefonso with the chasuble, and instructed him to wear it for the Holy Sac rifice on her festivals 
This apparition of the Immaculate Virgin to Ildefonso has been portrayed in arts, famous of which is the painting of E Greco. 
Aside from being a devotee of the Blessed Virgin, he is also a believer of Saint Leocadia, the patroness of Toledo Coxila, an eighth century archbishop of Toledo, related that Ildefonso was one day praying before the relics of Leocad when the martyr rose from her tomb Leocadia thanked Ildefonso for her devotion tion towards the Mother of God.
Ildefonso peacefully died on January 23,667 after serving the church in Toledo for nine years. He served diligence and zeal the flock assigned to him through preaching, writing, and pastoral works.`
  },
    "St. Joachim": {
    nick: "(San Joaquin)",
    sub: "",
    feast: "",
    desc: `Saint Joachim is the father of Mary, mother of Jesus. According to the second-century apocryphal text, he was a priest who had no children in his 20 years of marriage with Anne. Back then, being childless is considered to be the result of some secret sin. The high priest refused Joachim's sacrifice. Joachim went to the wilderness where an angel appeared to him and his wife, and announced the forthcoming birth of Mary. 
Joachim is shown as a bearded, old man who is identified only through his proximity to Anne.`
  },
    "St. Joseph": {
    nick: "(San Jose)",
    sub: "Universal Patron of the Church",
    feast: "Feast Day: March 19",
    desc: `Joseph came from the lineage of David, considered to be the greatest king of Israel. There were two accounts in the Gospel that mentioned Joseph's father, though both accounts conflict each other. In Luke 3:23-24, Joseph was said to be the son of Heli. In Matthew 1:16, he was said to be the son of Jacob. He was a "tekton," a Greek term which loosely translates to being a carpenter (Matthew 13:55). He is considered to be the foster-father of Jesus.
Mary was pledged to marry Joseph but before the marriage could take place, Mary was found to be pregnant through the Holy Spirit. He didn't want to expose Mary to public humiliation so he decided to leave her.
An angel of the Lord then appeared to him and said "Joseph son of David, do not be afraid to take Mary home as your wife, because what is conceived in her is from the Holy Spirit. She will give birth to a son, and you are to give him the name Jesus, because he will save his people from their sins."
After Jesus was born in Bethlehem, an angel again appeared in sleep to Joseph to warn him of an impending danger. "Get up, take the child and his mother and escape to Egypt. Stay there until I tell you, for Herod is going to search for the child to kill him," the angel said. After Herod died, Joseph was commanded again by an angel to go back to Israel.
No word in the Bible was attributed to Joseph. It was believed that he died before Jesus started preaching. According to Catholic tradition, he died in the arms of Jesus and Mary. In the 8th of December 1870, Pope Pius IX proclaimed Joseph as the patron of the Universal Church. March 19 is celebrated as the Solemnity of Joseph. The May 1 festivity of Saint Joseph the Worker was introduced by Pope Pius XII in 1955.
As guardian of Jesus, the Child Jesus is Joseph's common attribute in arts. Although the Bible didn't make any mention of his age, he is depicted as an elderly. The flower that Joseph held is almond blossoms. There were some accounts saying that Joseph was chosen to become the husband of Mary because of all the suitors in the temple, only Joseph's staff (or stick) bore flowers.`
  },
    "St. Michael the Archangel": {
    nick: "(San Miguel Arkanghel)",
    sub: "Patron Saint of Chivalry, Warriors, Police Officers, Soldiers",
    feast: "Feast Day: September 29",
    desc: `The name Michael means "Who is like God?" in Hebrew. He was mentioned four times in the Bible 
In Daniel 10:13, Daniel said "Then Michael, one of the chief princes, came to help me, because I was detained there with the king of Persia. "In Daniel 12:1, it said "At that time Michael, the great prince who protects your people, will arise." 
In Jude 1:9, it said "But even the archangel Michael, when he was disputing with the devil about the body of Moses, did not dare to bring a slanderous accusation against him, but said, "The Lord rebuke you!”
Lastly in Revelation 12:7, ”And there was war in heaven. Michael and his angels fought against the dragon and the dragon and his angels fought back." 
Following these, Christian tradition gives Michael four tasks: to fight against Satan; to rescue the souls of the faithful from the enemy; to be the champion of God’s people and bring men's souls to judgement. 
Michael is portrayed as young and beautiful. He has a long hair floating on his shoulders and has two wings. The most common, however, is his standing arm, setting his foot on Lucifer, and is about to transfix him with his sword.`
  },
    "St. Paul": {
    nick: "(San Pablo)",
    sub: "Patron Saint of Fishermen",
    feast: "Feast Day: June 29",
    desc: `Saint Paul is the apostle of the Gentiles. His original name was Saul. A Jew, born at Tarsus and brought up by Gamaliel as a Pharisee, Paul was first a persecutor of Christianity, who took part in the stoning of the first Christian martyr Stephen. He also sought out Chris-tians and had them imprisoned. 
However, on his way to Damascus, he experienced a vision of Christ which was to be decisive in determining the future course of his life. According to Acts 9, when Paul traveled and was on his way to Damascus, a light suddenly flashed around him, fell to the ground and heard a voice of Jesus saying "Saul, Saul, why are you persecuting Me?" Soul turned blind and was ordered by Jesus to proceed to the city. There, he met Ananias who baptized him. Saul was baptized as Paul and regained sight. 
The substance of the experience caused a conviction that Jesus was in some way identified with the Christian Church and that Paul was to bring the Christian faith to the Gentiles. 
Paul was not only a tireless missionary: he was also a powerful thinker saturated in the mystery of Christ. He wrote several epistles or letters that are dedicated to the group of people (e.g. Epistle to the Romans, Epistle to the Galatians) He wrote epistles about the grace of God, faith, celibacy, love towards neighbor among others. Tradition has said that Paul was beheaded during the time of Nero. 
Peter and Paul, most of the time are seen together. This was because the early Christian church was considered under two divisions - the church of the converted Jews represented by Peter and the church of the Gentiles represented by Paul. His sword signifies the manner of his martyrdom, but it could also mean his fight in the cause of Christ.`
  },
    "St. Peter of Alcantara": {
    nick: "(San Pedro de Alcantara)",
    sub: "Patron Saint of the Nocturnal Adorers	",
    feast: "Feast Day: October 19",
    desc: `Peter was born in Alcantara, Spain in 1499. He was the son of the governor, also named as Peter while his mother was a member of a noble family.
He first studied grammar and philosophy and at age fourteen, he was sent to the University of Salamanca. Peter became a Franciscan in the convent of Stricter Observance at Manxaretes, in western Spain in 1515. He was ordained priest at age 25 and later became the guardian of the convent of Saint Mary of the Angels in Robredillo.
In 1538, he was elected as minister of Saint Gabriel's religious province in Estramadura and formulated the Constitutions of the Stricter Observants. His ideas were met with opposition and therefore resigned as the provincial minister. He went to the mountains of Arabida, Portugal and lived as a hermit. Other friars soon followed him and communities were soon established.
In 1555, Peter journeyed barefoot to Rome and asked Pope Julius III to find some poor convents in Spain. Years later, Peter was named superior of a religious province with the title of Saint Joseph. He decided to re-write the constitution for his province which eventually became popular with other religious provinces in Spain and Portugal. It was during these times that he met Teresa where he later became her spiritual guide.
Peter died in the 18th of October 1562. He was said to have been imprisoned and was under heavy guard, waiting for his death, when an angel woke him up. They were able to escape from the two sets of guards and the angel led Peter to the street. He went to the home of Mary, Saint Mark's mother where many Christians were praying for his safety.
Peter is depicted as levitating, to commemorate the event where he was guided by an angel.`
  },
    "St. Peter the Baptist": {
    nick: "(San Pedro de Bautista)",
    sub: "Patron Saint of the Franciscan Missionaries in the Philippines",
    feast: "Feast Day: February 5",
    desc: `Peter was born in Avila in Spain and became a Franciscan in 1567. In 1583, he was sent to Mexico and then to the Philip- pines. He became known for his preaching and socio-missionary work. In his deep concern for his fellow friars' spiritual welfare, Peter saw the need for a secluded place where missionaries could revive their spiritual vigor by prayer, reflection and discipline. He built a small bamboo and nipa convent and church in San Francisco del Monte in Quezon City. It became a retreat and a novitiate house for missionaries.
In May 1593, the Governor of the Philippines sent Peter and other Francis- cans as his ambassadors to Japan. Peter and his companions were well received by emperor Toyotomi Hideyoshi. They were able to establish convents, schools and hospitals.
In 1596, Spanish war vessel San Fe was stranded in Tosa province in Shika. It was customary in Japan for the vessel to become the property of the emperor. The captain of the ship then said that missionaries were sent to prepare for the conquest of Japan. Furious, the emperor ordered the missionaries to be imprisoned. On the 5th of February 1597, Peter and other missionaries, including Saint Philip of Jesus, were crucified in Nagasaki. This would explain why his arms are raised in portraits and sculptures. They were canonized by Pope Pius IX in 1862 and were known to be Martyrs of Japan.`
  },
    "St. Peter": {
    nick: "(San Pedro)",
    sub: "Patron Saint of Fishermen",
    feast: "Feast Day: June 29",
    desc: `He was called Simon, a native of Bethsaida, near the Sea of Galilee and a brother of Andrew who introduced him to Christ, who gave him the name of Cephas Peter) which means rock. He was a Galilean fisherman assigned a leadership role by Jesus. The meaning of the name Peter was further explained by Christ when, in answer to Peter's famous confession of faith, recognized by Jesus as the result of revelation by the Father, Christ told him that "you are Peter and upon this rock I will build my church, "that" the gates of hell" would never prevail against it, and that Peter would have the power of "binding and loosing," but that he personally would be given "the keys of the kingdom of heaven." 
When Jesus was arrested in the Garden of Gethsemane, Peter cut off the right ear of a slave of a high priest. Later on, he would deny Jesus three times. He also witnessed the first appearance of the Risen Christ. 
His first miracle was in a place called Beautiful Gate, according to Acts 3: 1-10. As Peter and apostle John were about to enter the gate, a man who was unable to walk begged for money. Peter told him, "I have neither any silver or gold, but what I have I give you. In the name of Jesus Christ of Nazareth, get up and walk. "Peter then took by the right arm and helped him up. Immediately, the man's feet and ankles became strong, and he walked, jumped and praised the Lord.
Peter died in 64 AD in Rome during the reign of Emperor Nero, a prosecutor of Christians. According to tradition, Peter was crucified upside because he thought himself unworthy to die in the same manner as Jesus.
Images of Peter are innumerable, and his portraiture remains curiously consists of a man with a square face, a bald or tonsured head, and a short square curly beard. His principal attribute is set of keys of gold and one of silver or iron. The keys could mean two things - to absolve and bind or that they are used to open the gates of heaven and hell. He's also seen several times with a ship or fish, or even a rooster, in memory of his denial of the Lord. Sometimes he is dressed in a toga; at other times, he is vested as pope or bishop, with or without a tiara or mitre.`
  },
    "St. Philip of Jesus": {
    nick: "(San Felipe de Jesus)",
    sub: "",
    feast: "Feast Day: February 5",
    desc: `Philip was born in Mexico. Though unusually frivolous as a boy, he joined the Discalced Franciscans of the province of Saint Didacus, founded by Saint Peter Bautista with whom he suffered martyrdom later. After some months in the order, Philip grew tired of monastic life and left the Franciscans in 1589. He took up a mercantile career and went to the Philippines. Later, he desired to re-enter the Franciscans and was again admitted at Our Lady of the Angels in Manila in 1590.
In 1596, the Franciscans ordered Philip to be sent to Mexico with other religious. Storms drove their vessel to the coast of Japan. Their ship was confiscated by the governor and the crew and passengers imprisoned. Philip and his crew were accused of piracy and spying for the king of Spain.
Together with Peter Bautista, two Augustinians and Dominican, they met their holy death on February 5, 1597, after they were tortured and nailed on the cross. Philip was beatified in 1627 by Pope Urban VIII.`
  },
    "St. Raphael the Archangel": {
    nick: "(Santo Domingo)",
    sub: "Patron Saint of the Astronomers and Falsely Accused People",
    feast: "Feast Day: August 8",
    desc: `Dominic was born in Caleruega, Spain in 1170. He was the founder of the Friars Preachers, popularly called the Domini- cans or Order of Preachers (OP), a Catholic religious order. This organization has as its motto "to praise, to bless, to preach (in Latin: laudare, benedicere, praedicare) taken from the Preface of the Blessed gin Mary in the Roman Missal.
Throughout his life, Dominic is said to have zealously practiced rigorous self- denial. He abstained from meat and observed stated fasts and periods of silence. He selected the worst accommodations and the meanest clothes, and never allowed himself the luxury of a bed. When travelling, he beguiled the journey with spiritual instruction and prayers. As soon as he passed the limits of towns and villages, he took off his shoes, and, however sharp the stones or thorns, he trudged on his way barefooted. Rain and other discomforts elicited from his lips nothing but praises to God.
Dominic envisioned communities which were centers of sacred learning, and whose members would be devoted to studying, teaching, preaching and praying.
By the time of his death in 1221, five communities or provinces were established, namely Spain, Provence, France, Lombardy and Rome.
Dominic is portrayed as having a black and white dog which is a pun for his name and the Dominicans (Domini for black and white, and canis for dog).`
  },
    "St. Raymond of Nonnatus": {
    nick: "(San Ramon Nonnatus)",
    sub: "Patron Saint of Midwives",
    feast: "Feast Day: August 31",
    desc: `Raymond was born at Catalonia, Spain in 1204. He was delivered by caesarean operation when his mother died while giving birth. The name "non- natus" came from the Latin words "non" and "natus" which mean not born. Raymond came from a poor but noble family. His father ordered him to tend one of their farms. But since Raymond was drawn to religious life, he spent more time with the farm workers, studying and praying.
He joined the Mercedarian Order under Peter of Nolasco in Barcelona. This Order was founded by Saint Peter to ransom Christian captives of the Moors in North Africa.
When he ran out of money, Raymond surrendered himself as a hostage. He was sentenced to death by impalement but was later spared in the hope of a greater sum of money as ransom. To prevent him from preaching, his lips were pierced with red-hot iron and closed with a padlock. He was later ransomed by Peter.
In 1240, he was called to Rome by the pope but came only as far as Cardona, Spain, where he died. His body was brought to Saint Nicholas' chapel, which was near Raymond's family farm. He was canonized in 1657.`
  },
    "St. Roch": {
    nick: "(San Roque)",
    sub: "Patron Saint of Falsely Accused People, Invalids and the Sick",
    feast: "Feast Day: August 16",
    desc: `Roch was born at Montpellier France of a rich merchant family at around 1295. His parents died before he was twenty and was left with vast riches in money and land. He sold his fortune and distributed the proceeds to the poor. 
He spent most of his life in pilgrim-ages. While in Aquapendente, Italy, a plague raged the town. Roch helped the sick and it was said that they healed through his prayers and in making the sign of the cross. While he was in Piacenza also in Italy, an epidemic broke and he presented himself to assist in the hospital. Roch caught the plague himself, and had a wound in his right thigh. Fearing that he might disturb other patients, he crawled to the street but the city officers would not allow him to remain. He dragged himself to the wood. Everyday, his dog went to the city and came back in the eve with a loaf of bread in its mouth. The canine companion was with him in d his pilgrimages.
In one of his trips back to Montepellier, Roch was accused of being a spy. In 1327, he died in prison and only identified as the governor's nephew through birthmark in the form of a red cross in his chest. Roch was given an honorable burial by his uncle. 
In 1414, a plague broke out in Constance, Germany. A council of the Roman Catholic Church was then held and prayed to St. Roch. The plague immediately ceased.
He is commonly depicted as a pilgrim with a sore on his leg accompanied by a dog with a loaf of bread in mouth.`
  },
    "St. Theresa of Avila": {
    nick: "(Santa Teresa)",
    sub: "Patron Saint of People in Religious Orders",
    feast: "Feast Day: October 15",
    desc: `Teresa was baptized as Teresa Sanchez de Cepeda y Ahumada and was born in Avila, Spain in the 28th of March 1515. Beatriz, her mother, brought her as a pious Christian. After the death of her mother and the marriage of her eldest sister, she was sent to the Augustinian nuns at Avila to study. Teresa didn't stay long with the Augustinians due to malaria and so his father, Don Alfonso, brought her home.
Wanting to live a religious life, she went secretly to the Carmelite convent of the Incarnation outside of the town of Avila. But due to the recurrence of her illness, her father had her removed from the convent. She returned three years later.
Teresa had seen intellectual vision of divine things and heard inner voices. Though she was convinced that these were manifestations of God, she was at time fearful and troubled. She consult ed different priests and while some of them assured her that her experiences were divine graces, others accused her visions as diabolical.
Peter of Alcantara met Teresa when he was in Avila. He found in Teresa un- mistakable evidence of the Holy Spirit.
One miracle that was presented for Teresa's canonization occurred around 1561 when she established a new convent in Avila. Teresa's nephews crushed by a wall of the new structure which fell on him as he was playing. The nephew was brought lifeless to Teresa where she held the child in her arms and prayed. Minutes later, he became alive. The convent was later dedicated to Saint Joseph.
As the prioress, Teresa was strict. Her first requirement in selecting novices was intelligence "An intelligent mind is simple and teachable, it sees its fault and allows itself to be guided" she wrote. The nuns were secluded, under the rule of poverty and almost in complete silence. They were poor, wore habits and sandals instead of shoes. She limited the number of nuns to thirteen. When Teresa was sent to the convent of the Incarnation where she once lived to remedy the wrongdoings there, she was met with opposition. But by gentleness and tact, she was able to reestablish discipline, finances set to order and it became a truly religious community.
Teresa died on the night of 4th of October 1582. The next day, October 5, the Gregorian calendar took effect and it was necessary to add ten days. Her feast day is October 15.
She is depicted as wearing the habit of the Carmelites.`
  },
    "Immaculate Heart of Mary": {
    nick: "(Kalinis-linisang Puso ni Maria)",
    sub: "",
    feast: "",
    desc: `Although Saint John Eudes is a forerunner of devotion both to the Sacred Heart of Jesus and Immaculate Heart of Mary, he did more to promote the devotion to the latter. John, who hailed from France, is the founder of the Congregation of Jesus and Mary. In 1648, he introduced to the congregation a feast in honor of the Sacred Heart of Mary. He also wrote a treatise on Mary's heart entitled "The Admirable Heart of the Most Sacred Mother of God."
Just like the Sacred Heart, the image of the Immaculate Heart has a flame on top of it, a manifestation of her affection and care for the people. In lieu of Jesus' thorny crown, the Immaculate Heart has pink roses to signify that Mary is the Mystical Rose - the only human who was conceived without sin.
In the Second Vatican Council, Pope Paul VI entrusted the human race to the Immaculate Heart of Mary. He wrote: "We also entrust the whole human race for its protection, its difficulties and anxieties, its legitimate aspirations and ardent hopes to the guardianship of the heavenly Mother."`
  },
    "Our Lady of Guadalupe": {
    nick: "(Patroness of the Philippines)",
    sub: "",
    feast: "Feast Day: December 12",
    desc: `In the 9th of December 1531, the Blessed Virgin Mary appeared before Juan Diego on the hill of Tepeyac near Mexico City. She was said to have been surround- ed by a bright light. She asked him to go to the local bishop and tell him that a church should be built in her honor at the base of the hill. She told him, "Know and under- stand, you the dearest of my children, that I am the ever holy Virgin Mary, Mother of the true God through whom one lives, Mother of the Creator of heaven and of earth." Juan Diego proceeded to Bishop Juan de Zumarraga but the latter didn't believe his story. He went back to the hill and admitted his failure to the Virgin Mary. She directed him to see the bishop again and heed to her request.
Juan Diego returned the next day but was again turned down by the bishop. The bishop said that he needed a sign to believe that it was the Virgin Mary who sent him. Juan Diego returned to the Tepeyac Hill and told her of the bishop's demand for signs. She promised to fulfill it the next day when Juan visits her again.
Juan Diego failed to go to the hill on December 11 because his uncle was gravely ill. He spent the day looking for a doctor. Unable to find one, he told his dying uncle that he will look for a priest instead to hear his final confession.
On December 12, Juan Diego rushed to Tlatelolco to find a priest. Not wanting to encounter the Virgin Mary because he missed her the day before, and not wanting to be delayed in his search for priest, Juan Diego took a path on the other side of the hill. The Virgin Mary met her and listened to Juan Diego's excuse for not keeping his appointment. She told her, "Your uncle will not die of his sickness; he is healthy." She instructed him to go to the hilltop and gather the flowers he will find there. He found a garden of Castilian roses which the Blessed Virgin arranged in his "tilma" (a tilma is an outer garment worn by men in Mexico. It can be worn at the front like a long apron, or draped in the shoulders as a cloak). She told Juan Diego to bring the roses to the bishop.
When Juan Diego arrived before the bishop, he opened his tilma and the roses fell to the floor. A portrait of the Blessed Virgin then appeared in the cloth. The bishop fulfilled Juan Diego's request and a church was built dedicated to Virgin Mary. It is now a basilica. She is considered to be the Patroness of the Americas.
Prior to the apparition, there was no placed called Guadalupe in Mexico. There are two possible sources of the name though.
There was an Aztec word "coatlaxopeuh," pronounced as "quatsalupe" which is similar to the Spanish place of Guadalupe. Aztec is an ethnic group in central Mexico. The Aztec word means "the one who crushes the serpent." Before the Spaniards arrived in Mexico, Quaetzalcoatl was one of the chief Aztec gods. The Virgin Mary crushing the snake symbolizes Christianity taking over the non-Christian god. It could also be an interpretation of the Bible verse in Revelation 12:1, where it said "A great and miraculous sign appeared in heaven. It was a woman wearing the sun like clothes. The moon was under her feet. On her head she wore a crown of 12 stars."
Another possible source of the name is the municipality of Guadalupe in Extremadura, Spain. It was said that a statue of the Blessed Virgin, carved by the evangelist Luke, was found in Guadalupe in 1326.
In his book Imagen de la Virgen Maria, Madre de Dios de Guadalupe published in 1648, a diocesan priest of Mexico City, Miguel Sanchez wrote that "the Guadalupe possessed all the iconographical attributes of Mary in her Immaculate Conception."`
  },
    "Sacred Heart of Jesus": {
    nick: "(Kabanal-banalang Puso ni Jesus)",
    sub: "",
    feast: "",
    desc: `The modern devotion to the Sa- cred Heart of Jesus started with Saint Margaret Mary Alacoque, a nun who lived in France from 1647 to 1690. In 1675, as Margaret prayed in the Blessed Sacrament, Jesus told her: "Behold this Heart, which has loved men so much and in return I receive from the greater number nothing but ingratitude." According to accounts, Jesus asked Alacoque to set Friday as a day "for a special feast to honour My heart." 
Margaret described, in her own words a year before she died, the immaculate age of the Sacred Heart. In a letter to a priest, she wrote: "I saw this Divine Heart as on a throne of flames, more brilliant than the sun and transparent as crystal. It had its adorable wound and was encircled with a crown of thorns, which signified the pricks our sins caused Him. It was surmounted by a cross which signified that, from the first moment of His Incarnation, that is, from the time this Sacred Heart was formed, the cross was planted in it."`
  }
};

const prayersData = {
  "Our Father": `
Our Father,
Who art in heaven,
hallowed be Thy name.
Thy kingdom come,
Thy will be done, on earth as it is in heaven.
Give us this day our daily bread,
and forgive us our trespasses
as we forgive those who trespass against us,
and lead us not into temptation,
but deliver us from evil. Amen.
  `,

  "Hail Mary": `
Hail Mary, full of grace, the Lord is with thee.
Blessed art thou amongst women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death. Amen.
  `,

  "Glory Be": `
Glory be to the Father,
and to the Son,
and to the Holy Spirit,
as it was in the beginning,
is now, and ever shall be,
world without end. Amen.
  `,

  "The Apostle's Creed": `
I believe in God,
the Father Almighty,
Creator of Heaven and earth;
and in Jesus Christ, His only Son, Our Lord,
Who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died, and was buried.
He descended into Hell,
on the third day He arose again from the dead.
He ascended into Heaven,
and is seated at the right hand of
God the Father Almighty;
from thence He shall come to judge
the living and the dead.
I believe in the Holy Spirit,
the holy Catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and the life everlasting. Amen.
  `,

"Hail Holy Queen": `
Hail, Holy Queen, Mother of mercy,
our life, our sweetness and our hope.
To thee do we cry,
poor banished children of Eve:
to thee do we send up our sighs,
mourning and weeping in this valley of tears.
Turn then, most gracious advocate,
thine eyes of mercy toward us,
and after this our exile,
show unto us the blessed
fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary!
Pray for us, O holy Mother of God,
that we may be made worthy
of the promises of Christ. Amen.
  `,

"Anima Christi": `
Soul of Christ, sanctify me,
Body of Christ, save me,
Blood of Christ, inebriate me,
Water from the side of Christ, wash me,
Passion of Christ, strengthen me,
O good Jesus, hear me.
Hide me within your wounds,
keep me close to you,
defend me from the evil enemy,
call me at the hour of my death,
and bid me to come to you,
to praise you with your saints,
forever and ever. Amen.
  `,

"Memorare": `
Remember, O most gracious Virgin Mary,
that never was it known
that any one who fled to thy protection,
implored thy help,
or sought thy intercession,
was left unaided.
Inspired by this confidence,
We fly unto thee,
O Virgin of virgins my Mother;
to thee do we come, before thee we stand,
sinful and sorrowful,
O Mother of the Word Incarnate,
despise not our petitions,
but in thy mercy hear and answer them. Amen.
  `,

"The Angelus": `
The Angel of the Lord declared unto Mary.
And she conceived by the Holy Spirit.

Hail Mary, full of grace...

Behold the handmaid of the Lord.
Be it done unto me according to thy word.

Hail Mary, full of grace...

And the Word was made Flesh.
And dwelt among us.

Hail Mary, full of grace...

Pray for us, O Holy Mother of God,
that we may be made worthy of the promises of Christ.

Let us pray. Pour forth, 
we beseech thee, O Lord, 
thy grace into our hearts, 
that we, to whom the Incarnation of Christ, 
thy son, was made known by the message of an angel, 
may by his passion and cross be brought to the glory of his resurrection, 
through the same Christ our Lord. Amen.
  `,

"Saint Michael Prayer": `
Saint Michael the Archangel,
defend us in battle.
Be our protection against
the wickedness and snares of the devil.
May God rebuke him, we humbly pray,
and do thou, O Prince of the heavenly host,
by the power of God,
cast into hell Satan and all the evil spirits
who prowl throughout the world
seeking the ruin of souls. Amen.
  `,

"Act of Contrition": `
O my God, 
I am heartfully sorry for having offended thee, 
and I detest all my sins because of thy just punishment, 
but most of all because I have offended thee my God, 
who is all good and deserving of all my love. 
I firmly resolve, with the help of thy grace, 
to sin no more, 
and to avoid the near occasion of sin. Amen.
  `,

"Miraculous Medal Prayer": `
O Mary, Conceived without Sin, 
pray for us who have recourse to thee, 
and for those who do not have recourse to thee, 
especially the enemies of the Church. Amen.
  `,

"Morning Offering": `
Dear Lord, I do not know what will happen to me today — 
I only know that nothing will happen that was not foreseen by you and directed to my greater good from all eternity. 
I adore your holy and unfathomable plans, 
and submit to them with all my heart for love of you, 
the pope, and the Immaculate Heart of Mary. Amen.
  `,

"Guardian Angel Prayer": `
Angel of God, my guardian dear, 
to whom God's love commits me here, 
ever this day be at my side, to light and guard, 
to rule and guide. Amen.
  `,

"Prayer of Surrender": `
Lord Jesus Christ, 
take all my freedom, 
my understanding, and my will. 
All that I have and cherish you have given to me. 
I surrender it all to be guided by your will. 
Your love and your grace are wealth enough for me. 
Give me these, Lord Jesus, 
and I ask for nothing more. Amen.
  `,

"Grace Before Meals": `
Bless us, O Lord, 
and these thy gifts, 
which we are about to receive, 
from thy bounty, 
through Christ our Lord. Amen.
  `,

"Grace After Meals": `
We give thee thanks for all thy benefits, 
O Almighty God, who lives and reigns, 
world without end. Amen.

May the souls of the faithful departed, 
through the mercy of God, rest in peace. Amen.
  `,

"Sign of the Cross": `
In the name of the Father,
and of the Son,
and of the Holy Spirit. Amen
  `,
};

// inject nick, feast, desc into each card
cards.forEach(card => {
  const saintName = card.querySelector('.saint-name').textContent;
  const data = saintsData[saintName];

  if (data) {
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('list-info');

    infoDiv.innerHTML = `
      <div class="list-name">${saintName}</div>
      <div class="list-nick">${data.nick || ''}</div>
      <div class="list-sub">${data.sub || ''}</div>
      <div class="list-feast">${data.feast || ''}</div>
      <div class="list-desc">
        ${data.desc ? data.desc.substring(0, 80) + '...' : 'No description yet'}
        <span class="see-more">See more</span>
      </div>
    `;

    card.appendChild(infoDiv);
  }
});

cards.forEach(card => {
  card.addEventListener('click', () => {

    if (isOpen) return; 
    isOpen = true;

    const img = card.querySelector('img');
    originalRect = img.getBoundingClientRect();

    const clone = img.cloneNode(true);
    activeClone = clone;

    clone.style.position = 'fixed';
    clone.style.top = originalRect.top + 'px';
    clone.style.left = originalRect.left + 'px';
    clone.style.width = originalRect.width + 'px';
    clone.style.height = originalRect.height + 'px';
    clone.style.borderRadius = '12px';
    clone.style.transition = 'all 0.45s ease';
    clone.style.zIndex = '2000';
    clone.style.objectFit = 'cover';
    clone.style.objectPosition = 'center';
    clone.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';

    clone.style.borderRadius = '16px'; // same rounded corners as the image
    clone.style.objectFit = 'cover';
    clone.style.objectPosition = 'center';

    document.body.appendChild(clone);

    // 👀 Get saint info safely
    const saintName = card.querySelector('.saint-name').textContent;
    const data = saintsData[saintName];

    if (data) {
      titleEl.textContent = `${saintName} ${data.nick}`
      subEl.textContent = data.sub;
      feastEl.textContent = data.feast;
      descEl.innerHTML = data.desc.replace(/\n/g, "<br><br>"); // keeps paragraphs
    } else {
      titleEl.textContent = saintName;
      subEl.textContent = '';
      feastEl.textContent = '';
      descEl.textContent = 'Information coming soon.';
    }

clone.getBoundingClientRect();

let targetTop;
let targetLeft;
let targetWidth;
let targetHeight;

if (window.innerWidth < 768) {

  // 📱 Mobile - zoom to top center
  targetTop = 30;
  targetWidth = 120;
  targetHeight = 160;
  targetLeft = (window.innerWidth - targetWidth) / 2;

} else {

  // 💻 Desktop - your original layout
  targetTop = window.innerHeight * 0.12;
  targetLeft = window.innerWidth * 0.04;
  targetWidth = 400;
  targetHeight = 520;
}

clone.style.top = targetTop + 'px';
clone.style.left = targetLeft + 'px';
clone.style.width = targetWidth + 'px';
clone.style.height = targetHeight + 'px';
clone.style.transform = 'scale(1.1)';

overlay.classList.add('active');
disableBodyScroll();

setTimeout(() => {
  overlay.classList.add('show-info');
}, 450);
  });
});

overlay.addEventListener('click', () => {
  if (!isOpen) return;

  overlay.classList.remove('show-info');
  enableBodyScroll();

  activeClone.style.top = originalRect.top + 'px';
  activeClone.style.left = originalRect.left + 'px';
  activeClone.style.width = originalRect.width + 'px';
  activeClone.style.height = originalRect.height + 'px';
  
  setTimeout(() => overlay.classList.remove('active'), 200);

  activeClone.addEventListener('transitionend', () => {
    activeClone.remove();
    activeClone = null;
    isOpen = false;
  }, { once: true });
});

const prayerCards = document.querySelectorAll('.prayer-card');
const prayerOverlay = document.querySelector('.selected-prayer');
const prayerTitleEl = document.querySelector('.selected-prayer-info .prayer-title-full');
const prayerContentEl = document.querySelector('.selected-prayer-info .prayer-content');

let prayerScroll = 0;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function disableScroll() {
  prayerScroll = window.scrollY;

  const scrollbarWidth = getScrollbarWidth();

  document.body.style.position = 'fixed';
  document.body.style.top = `-${prayerScroll}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.paddingRight = `${scrollbarWidth}px`; // 👈 prevents shift
}

function enableScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.paddingRight = '';
  window.scrollTo(0, prayerScroll);
}

prayerCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.prayer-title').textContent;
    const content = prayersData[title];
  
    prayerTitleEl.textContent = title;
    prayerContentEl.innerHTML = content.replace(/\n/g, "<br><br>");

    prayerOverlay.classList.add('active');
    disableScroll();
    document.body.classList.add("hide-top-section");
    document.body.classList.add("hide-prayer-section");
  });
});

prayerOverlay.addEventListener('click', () => {
  prayerOverlay.classList.remove('active');
  enableScroll();
  document.body.classList.remove("hide-prayer-section");
  document.body.classList.remove("hide-top-section");
});

const calendarGrid = document.querySelector(".calendar-grid");
const monthTitle = document.getElementById("monthTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const eventPanel = document.querySelector(".event-panel");
const eventPanelContent = document.querySelector(".event-panel-content");

let currentDate = new Date();
const FIXED_YEAR = 2026;
currentDate = new Date(FIXED_YEAR, currentDate.getMonth(), 1);

let MIN_YEAR = null;
let MAX_YEAR = null;

let calendarEvents = {};

function renderCalendar() {
  calendarGrid.innerHTML = "";

  const year = FIXED_YEAR;
  const month = currentDate.getMonth();

  monthTitle.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  updateNavButtons();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {

    const dateKey = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = day;
    
    const season = getSeason(new Date(year, month, day));

    dayDiv.classList.add(`season-${season}`);
    
    // Auto highlight today
    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    // Add event dot if date has events
    if (calendarEvents[dateKey]) {
      const dot = document.createElement("div");
      dot.classList.add("event-dot");
      dayDiv.appendChild(dot);

      dayDiv.classList.add("has-event");
    }

    if (calendarEvents[dateKey]) {
      dayDiv.classList.add("highlight");

      dayDiv.addEventListener("click", () => {

        // Remove previous selected highlight
        if (selectedDayElement) {
          selectedDayElement.classList.remove("selected");
        }

        // Set new selected
        dayDiv.classList.add("selected");
        selectedDayElement = dayDiv;
        selectedDateKey = dateKey;

        showEvents(dateKey);
      });
    }

    calendarGrid.appendChild(dayDiv);
  }
}

function updateNavButtons() {

  const month = currentDate.getMonth();

  // Since year is fixed, we only check month
  prevBtn.disabled = month === 0;
  nextBtn.disabled = month === 11;
}

updateNavButtons();

function showEvents(dateKey) {

  const events = calendarEvents[dateKey];

  eventPanelContent.innerHTML = `<h3>${dateKey}</h3>`;

  events.forEach(event => {
    eventPanelContent.innerHTML += `
      <div>
        <strong>${event.title}</strong>
        <p>${event.type}</p>
      </div>
      <hr>
    `;
  });

  eventPanel.classList.add("active");
}

prevBtn.addEventListener("click", () => {

  if (currentDate.getMonth() > 0) {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  }

});

nextBtn.addEventListener("click", () => {

  if (currentDate.getMonth() < 11) {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  }

});

loadEvents();

document.addEventListener("click", (e) => {

  if (!eventPanel.classList.contains("active")) return;

  if (
    eventPanel.contains(e.target) ||
    e.target.closest(".day")
  ) {
    return;
  }

  eventPanel.classList.remove("active");
});

let selectedDayElement = null;
let selectedDateKey = null;

eventPanel.addEventListener("transitionend", () => {
  if (!eventPanel.classList.contains("active")) {
    if (selectedDayElement) {
      selectedDayElement.classList.remove("selected");
      selectedDayElement = null;
    }
  }
});

function goToCurrentMonth() {
  currentDate = new Date(FIXED_YEAR, new Date().getMonth(), 1);
  renderCalendar();
}

async function loadCalendarFromICS() {

  const response = await fetch("YOUR_ICS_URL_HERE");
  const icsText = await response.text();

  parseICS(icsText);
}

function parseICS(data) {

  const lines = data.split("\n");

  lines.forEach(line => {

    if (line.startsWith("SUMMARY:")) {
      // extract event title
    }

    if (line.startsWith("DTSTART")) {
      // extract event date
    }

  });

}

async function loadEvents() {

  try {
    const response = await fetch("events.json");
    const data = await response.json();

    calendarEvents = {};

    let years = [];

    data.forEach(event => {

      const year = parseInt(event.date.split("-")[0]);
      years.push(year);

      if (!calendarEvents[event.date]) {
        calendarEvents[event.date] = [];
      }

      calendarEvents[event.date].push({
        title: event.title,
        type: event.type
      });

    });

    MIN_YEAR = Math.min(...years);
    MAX_YEAR = Math.max(...years);

    // 🔥 WAIT — then generate feasts AFTER events loaded
    generateFeastEventsFromSaints();

    generateMovableFeasts(FIXED_YEAR);

    generateHolyDays(FIXED_YEAR);
    
    renderCalendar();

  } catch (error) {
    console.error("Failed to load events.json:", error);
  }
}
function generateFeastEventsFromSaints() {
  console.log("Generating feast events...");

  Object.keys(saintsData).forEach(saintName => {

    const data = saintsData[saintName];
    if (!data.feast) return;

    console.log("Processing:", saintName);

    const match = data.feast.match(/([A-Za-z]+)\s+(\d{1,2})/);

    if (!match) return;

    const monthName = match[1];
    const day = match[2];

    const monthIndex = new Date(`${monthName} 1, 2026`).getMonth();

    const dateKey = `${FIXED_YEAR}-${String(monthIndex + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

    console.log("Adding event to:", dateKey);

    if (!calendarEvents[dateKey]) {
      calendarEvents[dateKey] = [];
    }

    // Prevent duplicate feast entries for same saint on same date
    const exists = calendarEvents[dateKey]?.some(
      e => e.title === saintName && e.type.includes("Feast")
    );

    if (!exists) {
      calendarEvents[dateKey].push({
        title: saintName,
        type: data.feast
      });
    }

  });

}

function generateMovableFeasts(year) {

  const easter = calculateEaster(year);

  const events = [
    { name: "Easter Sunday", offset: 0 },
    { name: "Holy Thursday", offset: -3 },
    { name: "Good Friday", offset: -2 },
    { name: "Palm Sunday", offset: -7 },
    { name: "Ash Wednesday", offset: -46 },
    { name: "Pentecost", offset: 49 }
  ];

  events.forEach(event => {

    const date = new Date(easter);
    date.setDate(easter.getDate() + event.offset);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const dateKey = `${year}-${month}-${day}`;

    if (!calendarEvents[dateKey]) {
      calendarEvents[dateKey] = [];
    }

    calendarEvents[dateKey].push({
      title: event.name,
      type: "Movable Feast"
    });

  });
}

function generateHolyDays(year) {

  const holyDays = [
    { name: "Mary, Mother of God", month: 0, day: 1 },
    { name: "Immaculate Conception", month: 11, day: 8 },
    { name: "Christmas", month: 11, day: 25 },
    { name: "All Saints' Day", month: 10, day: 1 }
  ];

  holyDays.forEach(day => {

    const dateKey = `${year}-${String(day.month + 1).padStart(2,"0")}-${String(day.day).padStart(2,"0")}`;

    if (!calendarEvents[dateKey]) {
      calendarEvents[dateKey] = [];
    }

    calendarEvents[dateKey].push({
      title: day.name,
      type: "Holy Day of Obligation"
    });

  });
}

function calculateEaster(year) {

  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);

  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function getSeason(date) {

  const year = date.getFullYear();
  const easter = calculateEaster(year);

  const ashWednesday = addDays(easter, -46);
  const palmSunday = addDays(easter, -7);
  const pentecost = addDays(easter, 49);

  if (date >= ashWednesday && date < easter) {
    return "Lent";
  }

  if (date >= easter && date <= pentecost) {
    return "Easter";
  }

  // Christmas Season
  const christmasStart = new Date(year, 11, 25);
  const christmasEnd = new Date(year + 1, 0, 6);

  if (date >= christmasStart && date <= christmasEnd) {
    return "Christmas";
  }

  return "Ordinary";
}
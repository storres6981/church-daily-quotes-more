
import { BibleVerse } from "@/types/bible";
import { bibleBooks } from "@/data/bible-books";

const bibleVerses: { [key: string]: { [key: number]: BibleVerse[] } } = {
  genesis: {
    1: [
      { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning God created the heaven and the earth." },
      { book: "Genesis", chapter: 1, verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
      { book: "Genesis", chapter: 1, verse: 3, text: "And God said, Let there be light: and there was light." },
      { book: "Genesis", chapter: 1, verse: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
      { book: "Genesis", chapter: 1, verse: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
      { book: "Genesis", chapter: 1, verse: 6, text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters." },
      { book: "Genesis", chapter: 1, verse: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so." },
      { book: "Genesis", chapter: 1, verse: 8, text: "And God called the firmament Heaven. And the evening and the morning were the second day." },
      { book: "Genesis", chapter: 1, verse: 9, text: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so." },
      { book: "Genesis", chapter: 1, verse: 10, text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good." }
    ],
    2: [
      { book: "Genesis", chapter: 2, verse: 1, text: "Thus the heavens and the earth were finished, and all the host of them." },
      { book: "Genesis", chapter: 2, verse: 2, text: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made." },
      { book: "Genesis", chapter: 2, verse: 3, text: "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made." },
      { book: "Genesis", chapter: 2, verse: 4, text: "These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens." },
      { book: "Genesis", chapter: 2, verse: 5, text: "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground." }
    ],
    3: [
      { book: "Genesis", chapter: 3, verse: 1, text: "Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?" },
      { book: "Genesis", chapter: 3, verse: 2, text: "And the woman said unto the serpent, We may eat of the fruit of the trees of the garden:" },
      { book: "Genesis", chapter: 3, verse: 3, text: "But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die." },
      { book: "Genesis", chapter: 3, verse: 4, text: "And the serpent said unto the woman, Ye shall not surely die:" },
      { book: "Genesis", chapter: 3, verse: 5, text: "For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil." }
    ]
  },
  exodus: {
    1: [
      { book: "Exodus", chapter: 1, verse: 1, text: "Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob." },
      { book: "Exodus", chapter: 1, verse: 2, text: "Reuben, Simeon, Levi, and Judah," },
      { book: "Exodus", chapter: 1, verse: 3, text: "Issachar, Zebulun, and Benjamin," },
      { book: "Exodus", chapter: 1, verse: 4, text: "Dan, and Naphtali, Gad, and Asher." },
      { book: "Exodus", chapter: 1, verse: 5, text: "And all the souls that came out of the loins of Jacob were seventy souls: for Joseph was in Egypt already." }
    ],
    20: [
      { book: "Exodus", chapter: 20, verse: 1, text: "And God spake all these words, saying," },
      { book: "Exodus", chapter: 20, verse: 2, text: "I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage." },
      { book: "Exodus", chapter: 20, verse: 3, text: "Thou shalt have no other gods before me." },
      { book: "Exodus", chapter: 20, verse: 4, text: "Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth." },
      { book: "Exodus", chapter: 20, verse: 5, text: "Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me;" }
    ]
  },
  psalms: {
    1: [
      { book: "Psalms", chapter: 1, verse: 1, text: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful." },
      { book: "Psalms", chapter: 1, verse: 2, text: "But his delight is in the law of the LORD; and in his law doth he meditate day and night." },
      { book: "Psalms", chapter: 1, verse: 3, text: "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper." },
      { book: "Psalms", chapter: 1, verse: 4, text: "The ungodly are not so: but are like the chaff which the wind driveth away." },
      { book: "Psalms", chapter: 1, verse: 5, text: "Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous." }
    ],
    23: [
      { book: "Psalms", chapter: 23, verse: 1, text: "The LORD is my shepherd; I shall not want." },
      { book: "Psalms", chapter: 23, verse: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
      { book: "Psalms", chapter: 23, verse: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
      { book: "Psalms", chapter: 23, verse: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
      { book: "Psalms", chapter: 23, verse: 5, text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
      { book: "Psalms", chapter: 23, verse: 6, text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." }
    ],
    91: [
      { book: "Psalms", chapter: 91, verse: 1, text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty." },
      { book: "Psalms", chapter: 91, verse: 2, text: "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust." },
      { book: "Psalms", chapter: 91, verse: 3, text: "Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence." },
      { book: "Psalms", chapter: 91, verse: 4, text: "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler." },
      { book: "Psalms", chapter: 91, verse: 5, text: "Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day;" }
    ]
  },
  proverbs: {
    1: [
      { book: "Proverbs", chapter: 1, verse: 1, text: "The proverbs of Solomon the son of David, king of Israel;" },
      { book: "Proverbs", chapter: 1, verse: 2, text: "To know wisdom and instruction; to perceive the words of understanding;" },
      { book: "Proverbs", chapter: 1, verse: 3, text: "To receive the instruction of wisdom, justice, and judgment, and equity;" },
      { book: "Proverbs", chapter: 1, verse: 4, text: "To give subtilty to the simple, to the young man knowledge and discretion." },
      { book: "Proverbs", chapter: 1, verse: 5, text: "A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels:" }
    ],
    3: [
      { book: "Proverbs", chapter: 3, verse: 5, text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding." },
      { book: "Proverbs", chapter: 3, verse: 6, text: "In all thy ways acknowledge him, and he shall direct thy paths." },
      { book: "Proverbs", chapter: 3, verse: 7, text: "Be not wise in thine own eyes: fear the LORD, and depart from evil." },
      { book: "Proverbs", chapter: 3, verse: 8, text: "It shall be health to thy navel, and marrow to thy bones." },
      { book: "Proverbs", chapter: 3, verse: 9, text: "Honour the LORD with thy substance, and with the firstfruits of all thine increase:" }
    ]
  },
  matthew: {
    5: [
      { book: "Matthew", chapter: 5, verse: 1, text: "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:" },
      { book: "Matthew", chapter: 5, verse: 2, text: "And he opened his mouth, and taught them, saying," },
      { book: "Matthew", chapter: 5, verse: 3, text: "Blessed are the poor in spirit: for theirs is the kingdom of heaven." },
      { book: "Matthew", chapter: 5, verse: 4, text: "Blessed are they that mourn: for they shall be comforted." },
      { book: "Matthew", chapter: 5, verse: 5, text: "Blessed are the meek: for they shall inherit the earth." },
      { book: "Matthew", chapter: 5, verse: 6, text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled." },
      { book: "Matthew", chapter: 5, verse: 7, text: "Blessed are the merciful: for they shall obtain mercy." },
      { book: "Matthew", chapter: 5, verse: 8, text: "Blessed are the pure in heart: for they shall see God." },
      { book: "Matthew", chapter: 5, verse: 9, text: "Blessed are the peacemakers: for they shall be called the children of God." },
      { book: "Matthew", chapter: 5, verse: 10, text: "Blessed are they which are persecuted for righteousness' sake: for theirs is the kingdom of heaven." }
    ],
    6: [
      { book: "Matthew", chapter: 6, verse: 9, text: "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name." },
      { book: "Matthew", chapter: 6, verse: 10, text: "Thy kingdom come, Thy will be done in earth, as it is in heaven." },
      { book: "Matthew", chapter: 6, verse: 11, text: "Give us this day our daily bread." },
      { book: "Matthew", chapter: 6, verse: 12, text: "And forgive us our debts, as we forgive our debtors." },
      { book: "Matthew", chapter: 6, verse: 13, text: "And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen." }
    ]
  },
  john: {
    1: [
      { book: "John", chapter: 1, verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { book: "John", chapter: 1, verse: 2, text: "The same was in the beginning with God." },
      { book: "John", chapter: 1, verse: 3, text: "All things were made by him; and without him was not any thing made that was made." },
      { book: "John", chapter: 1, verse: 4, text: "In him was life; and the life was the light of men." },
      { book: "John", chapter: 1, verse: 5, text: "And the light shineth in darkness; and the darkness comprehended it not." },
      { book: "John", chapter: 1, verse: 6, text: "There was a man sent from God, whose name was John." },
      { book: "John", chapter: 1, verse: 7, text: "The same came for a witness, to bear witness of the Light, that all men through him might believe." },
      { book: "John", chapter: 1, verse: 8, text: "He was not that Light, but was sent to bear witness of that Light." },
      { book: "John", chapter: 1, verse: 9, text: "That was the true Light, which lighteth every man that cometh into the world." },
      { book: "John", chapter: 1, verse: 10, text: "He was in the world, and the world was made by him, and the world knew him not." }
    ],
    3: [
      { book: "John", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
      { book: "John", chapter: 3, verse: 17, text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },
      { book: "John", chapter: 3, verse: 18, text: "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God." },
      { book: "John", chapter: 3, verse: 19, text: "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil." },
      { book: "John", chapter: 3, verse: 20, text: "For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved." }
    ],
    14: [
      { book: "John", chapter: 14, verse: 1, text: "Let not your heart be troubled: ye believe in God, believe also in me." },
      { book: "John", chapter: 14, verse: 2, text: "In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you." },
      { book: "John", chapter: 14, verse: 3, text: "And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also." },
      { book: "John", chapter: 14, verse: 4, text: "And whither I go ye know, and the way ye know." },
      { book: "John", chapter: 14, verse: 5, text: "Thomas saith unto him, Lord, we know not whither thou goest; and how can we know the way?" },
      { book: "John", chapter: 14, verse: 6, text: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me." }
    ]
  },
  romans: {
    8: [
      { book: "Romans", chapter: 8, verse: 28, text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
      { book: "Romans", chapter: 8, verse: 29, text: "For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren." },
      { book: "Romans", chapter: 8, verse: 30, text: "Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified." },
      { book: "Romans", chapter: 8, verse: 31, text: "What shall we then say to these things? If God be for us, who can be against us?" },
      { book: "Romans", chapter: 8, verse: 32, text: "He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?" }
    ],
    12: [
      { book: "Romans", chapter: 12, verse: 1, text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service." },
      { book: "Romans", chapter: 12, verse: 2, text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God." },
      { book: "Romans", chapter: 12, verse: 3, text: "For I say, through the grace given unto me, to every man that is among you, not to think of himself more highly than he ought to think; but to think soberly, according as God hath dealt to every man the measure of faith." },
      { book: "Romans", chapter: 12, verse: 4, text: "For as we have many members in one body, and all members have not the same office:" },
      { book: "Romans", chapter: 12, verse: 5, text: "So we, being many, are one body in Christ, and every one members one of another." }
    ]
  },
  revelation: {
    1: [
      { book: "Revelation", chapter: 1, verse: 1, text: "The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass; and he sent and signified it by his angel unto his servant John:" },
      { book: "Revelation", chapter: 1, verse: 2, text: "Who bare record of the word of God, and of the testimony of Jesus Christ, and of all things that he saw." },
      { book: "Revelation", chapter: 1, verse: 3, text: "Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein: for the time is at hand." },
      { book: "Revelation", chapter: 1, verse: 4, text: "John to the seven churches which are in Asia: Grace be unto you, and peace, from him which is, and which was, and which is to come; and from the seven Spirits which are before his throne;" },
      { book: "Revelation", chapter: 1, verse: 5, text: "And from Jesus Christ, who is the faithful witness, and the first begotten of the dead, and the prince of the kings of the earth. Unto him that loved us, and washed us from our sins in his own blood," }
    ],
    21: [
      { book: "Revelation", chapter: 21, verse: 1, text: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea." },
      { book: "Revelation", chapter: 21, verse: 2, text: "And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband." },
      { book: "Revelation", chapter: 21, verse: 3, text: "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God." },
      { book: "Revelation", chapter: 21, verse: 4, text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },
      { book: "Revelation", chapter: 21, verse: 5, text: "And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful." }
    ]
  }
};

export const fetchVerses = async (bookId: string, chapter: number): Promise<BibleVerse[]> => {
  // Add a small delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Convert bookId to lowercase to ensure consistent matching
  const lowercaseBookId = bookId.toLowerCase();
  
  // Check if we have the verses in our local data
  if (bibleVerses[lowercaseBookId]?.[chapter]) {
    return bibleVerses[lowercaseBookId][chapter];
  }

  // If verses aren't in local data, find the book and return placeholder verses
  const book = bibleBooks.find(b => b.id.toLowerCase() === lowercaseBookId);
  if (!book) {
    throw new Error(`Book ${bookId} not found`);
  }

  // Generate placeholder verses
  return Array.from({ length: 10 }, (_, i) => ({
    book: book.name,
    chapter,
    verse: i + 1,
    text: `[Placeholder] Verse ${i + 1} from ${book.name} chapter ${chapter}.`
  }));
};

export const searchBible = async (query: string): Promise<BibleVerse[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const results: BibleVerse[] = [];
  
  Object.values(bibleVerses).forEach(chapters => {
    Object.values(chapters).forEach(verses => {
      verses.forEach(verse => {
        if (verse.text.toLowerCase().includes(query.toLowerCase())) {
          results.push(verse);
        }
      });
    });
  });

  return results.slice(0, 20);
};

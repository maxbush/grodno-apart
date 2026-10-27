import heroImg from "../assets/hero.jpg";
import batory1 from "../assets/batory_10/1.webp";
import batory2 from "../assets/batory_10/2.webp";
import batory3 from "../assets/batory_10/3.webp";
import batory4 from "../assets/batory_10/4.webp";
import batory5 from "../assets/batory_10/5.webp";
import batory6 from "../assets/batory_10/6.webp";
import batory7 from "../assets/batory_10/7.webp";
import batory8 from "../assets/batory_10/8.webp";
import batory9 from "../assets/batory_10/9.webp";
import batory11 from "../assets/batory_10/11.webp";
import batory12 from "../assets/batory_10/12.webp";
import batory13 from "../assets/batory_10/13.webp";
import batory14 from "../assets/batory_10/14.webp";
import batory15 from "../assets/batory_10/15.webp";
import batory16 from "../assets/batory_10/16.webp";
import batory17 from "../assets/batory_10/17.webp";
import batory18 from "../assets/batory_10/18.webp";
import batory19 from "../assets/batory_10/19.webp";
import gorodenskogo1 from "../assets/Gorodenskogo_1/dl.webp";
import gorodenskogo2 from "../assets/Gorodenskogo_1/dl (2).webp";
import gorodenskogo3 from "../assets/Gorodenskogo_1/dl (3).webp";
import gorodenskogo4 from "../assets/Gorodenskogo_1/dl (4).webp";
import gorodenskogo5 from "../assets/Gorodenskogo_1/dl (5).webp";
import gorodenskogo6 from "../assets/Gorodenskogo_1/dl (6).webp";
import gorodenskogo7 from "../assets/Gorodenskogo_1/dl (7).webp";
import gorodenskogo8 from "../assets/Gorodenskogo_1/dl (8).webp";
import gorodenskogo9 from "../assets/Gorodenskogo_1/dl (9).webp";
import gorodenskogo10 from "../assets/Gorodenskogo_1/dl (10).webp";
import gorodenskogo11 from "../assets/Gorodenskogo_1/dl (11).webp";
import gorodenskogo12 from "../assets/Gorodenskogo_1/dl (12).webp";
import gorodenskogo13 from "../assets/Gorodenskogo_1/dl (13).webp";
import gorodenskogo14 from "../assets/Gorodenskogo_1/dl (14).webp";
import gorodenskogo15 from "../assets/Gorodenskogo_1/dl (15).webp";
import gorodenskogo16 from "../assets/Gorodenskogo_1/dl (16).webp";
import gorodenskogo17 from "../assets/Gorodenskogo_1/dl (17).webp";
import gorodenskogo18 from "../assets/Gorodenskogo_1/dl (18).webp";
import gorodenskogo2_1 from "../assets/Gorodenskogo_2/1.webp";
import gorodenskogo2_2 from "../assets/Gorodenskogo_2/2.webp";
import gorodenskogo2_3 from "../assets/Gorodenskogo_2/3.webp";
import gorodenskogo2_4 from "../assets/Gorodenskogo_2/4.webp";
import gorodenskogo2_5 from "../assets/Gorodenskogo_2/5.webp";
import gorodenskogo2_6 from "../assets/Gorodenskogo_2/6.webp";
import gorodenskogo2_7 from "../assets/Gorodenskogo_2/7.webp";
import gorodenskogo2_8 from "../assets/Gorodenskogo_2/8.webp";
import gorodenskogo2_9 from "../assets/Gorodenskogo_2/9.webp";
import gorodenskogo2_10 from "../assets/Gorodenskogo_2/10.webp";
import gorodenskogo2_11 from "../assets/Gorodenskogo_2/11.webp";
import gorodenskogo2_12 from "../assets/Gorodenskogo_2/12.webp";
import gorodenskogo2_13 from "../assets/Gorodenskogo_2/13.webp";
import gorodenskogo2_14 from "../assets/Gorodenskogo_2/14.webp";
import gorodenskogo2_15 from "../assets/Gorodenskogo_2/15.webp";
import gorodenskogo2_16 from "../assets/Gorodenskogo_2/16.webp";
import gorodenskogo2_17 from "../assets/Gorodenskogo_2/17.webp";
import gorodenskogo2_18 from "../assets/Gorodenskogo_2/18.webp";
import gorodenskogo2_19 from "../assets/Gorodenskogo_2/19.webp";
import oginskogo1 from "../assets/Oginskogo/1.webp";
import oginskogo2 from "../assets/Oginskogo/2.webp";
import oginskogo3 from "../assets/Oginskogo/3.webp";
import oginskogo4 from "../assets/Oginskogo/4.webp";
import oginskogo5 from "../assets/Oginskogo/5.webp";
import oginskogo6 from "../assets/Oginskogo/6.webp";
import oginskogo7 from "../assets/Oginskogo/7.webp";
import oginskogo8 from "../assets/Oginskogo/8.webp";
import oginskogo9 from "../assets/Oginskogo/9.webp";
import oginskogo10 from "../assets/Oginskogo/10.webp";
import kosmonavtov1 from "../assets/Kosmonavtov/1.webp";
import kosmonavtov2 from "../assets/Kosmonavtov/2.webp";
import kosmonavtov3 from "../assets/Kosmonavtov/3.webp";
import kosmonavtov4 from "../assets/Kosmonavtov/4.webp";

export const heroImage = heroImg;

export interface Apartment {
  id: number;
  name: string;
  address: string;
  rooms: string;
  description: string;
  features: string[];
  images: string[];
  accent: string;
  guests: number;
}

export const apartments: Apartment[] = [
  {
    id: 1,
    name: "Батория",
    address: "ул. Ст. Батория, 10",
    rooms: "1 комната",
    description:
      "Идеальная локация для гостей нашего города. В шаговой доступности находятся старинные замки и храмы всех конфессий, набережная Немана, пешеходная улица Советская с брусчаткой, кафе, магазинами и уличным музыкантами. С балкона наших апартаментов можно увидеть не только достопримечательности, но и все праздники, ярмарки и салюты, а в новогодние праздники полюбоваться главной новогодней елкой города",
    features: [
      "Центр старого города",
      "Smart TV",
      "Полностью оборудованная кухня",
      "Дизайнерский интерьер",
      "Бесплатный Wi-Fi",
    ],
    images: [
      batory1,
      batory2,
      batory3,
      batory4,
      batory5,
      batory6,
      batory7,
      batory8,
      batory9,
      batory11,
      batory12,
      batory13,
      batory14,
      batory15,
      batory16,
      batory17,
      batory18,
      batory19,
    ],
    accent: "#2D8B9E",
    guests: 2+2,
  },
  {
    id: 3,
    name: "Городенского I",
    address: "ул. Д. Городенского, 2",
    rooms: "1 комната",
    description:
      "Уютные апартаменты с роскошным видом на купола Рождество-Богородичного собора расположены на одной из самых старинных улиц города. Дом находится в уникальном месте - напротив двух замков. Из окон этих апартаментов открывается восхитительный вид на звездные купола Рождество-Богородичного монастыря, создавая неповторимую и загадочную атмосферу. Открыв окно наших апартаментов, вы можете услышать игру знаменитого гродненского трубача на пожарной каланче или насладиться звуками колоколов Рождество-Богородичного монастыря. Локация идеально подходит для туристов, ведь все главные достопримечательности Гродно находятся в пешей доступности от наших апартаментов.",
    features: [
      "Исторический центр",
      "Авторский дизайн",
      "Оборудованная кухня",
      "Smart TV",
      "Бесплатный Wi-Fi",
    ],
    images: [
      gorodenskogo1,
      gorodenskogo2,
      gorodenskogo3,
      gorodenskogo4,
      gorodenskogo5,
      gorodenskogo6,
      gorodenskogo7,
      gorodenskogo8,
      gorodenskogo9,
      gorodenskogo10,
      gorodenskogo11,
      gorodenskogo12,
      gorodenskogo13,
      gorodenskogo14,
      gorodenskogo15,
      gorodenskogo16,
      gorodenskogo17,
      gorodenskogo18,
    ],
    accent: "#5B7F95",
    guests: 2 + 2,
  },
  {
    id: 4,
    name: "Городенского II",
    address: "ул. Д. Городенского, 2",
    rooms: "1 комната",
    description:
      "Наши вторые апартаменты также находятся по адресу улица Городенского, 2. Уютные однокомнатные апартаменты с балконом расположены в историческом центре Гродно напротив Нового замка. Идеальная локация для тех, кто хочет за один день посмотреть Гродно. В пешей доступности расположенны главные достопримечательности города. В минуте ходьбы от квартиры расположен Свято-Рождество-Богородичный монастырь XVII в., в пяти минутах ходьбы расположены Старый и Новый замки, пожарная каланча, Синагога, музей Истории религии, Драматический театр, костел святого Франциска Ксаверия. В семи минутах ходьбы расположена известная пешеходная улица Советская. Также рядом с апартаментами проходят старинные улицы Замковая, Троицкая, Стефана Батория, гуляя по которым вы окунетесь в атмосферу исторического Гродно.",
    features: [
      "Бутик-дизайн",
      "Кирпичная кладка",
      "Дизайнерская мебель",
      "Барная стойка",
      "Smart TV",
      "Бесплатный Wi-Fi",
    ],
    images: [
      gorodenskogo2_19,
      gorodenskogo2_18,
      gorodenskogo2_17,
      gorodenskogo2_16,
      gorodenskogo2_15,
      gorodenskogo2_14,
      gorodenskogo2_13,
      gorodenskogo2_12,
      gorodenskogo2_11,
      gorodenskogo2_10,
      gorodenskogo2_9,
      gorodenskogo2_8,
      gorodenskogo2_7,
      gorodenskogo2_6,
      gorodenskogo2_5,
      gorodenskogo2_4,
      gorodenskogo2_3,
      gorodenskogo2_2,
      gorodenskogo2_1,
    ],
    accent: "#4A6670",
    guests: 2+2,
  },
  {
    id: 5,
    name: "Огинского",
    address: "ул. Огинского, 50",
    rooms: "1 комната",
    description:
      "Просторная и светлая квартира на высоком этаже с потрясающим видом. Мягкая серо-голубая палитра, живые цветы и обилие естественного света делают это пространство идеальным для отдыха.",
    features: [
      "Высокий этаж с видом",
      "Лифт",
      "Просторная кухня",
      "Большой Smart TV",
      "Светлый интерьер",
      "Бесплатный Wi-Fi",
    ],
    images: [
      oginskogo1,
      oginskogo2,
      oginskogo3,
      oginskogo4,
      oginskogo5,
      oginskogo6,
      oginskogo7,
      oginskogo8,
      oginskogo9,
      oginskogo10,
    ],
    accent: "#6B8FA3",
    guests: 3,
  },
  {
    id: 2,
    name: "Космонавтов",
    address: "пр. Космонавтов, 6",
    rooms: "2 комнаты",
    description:
      "Элегантная квартира в светлых тонах.",
    features: [
      "Просторная гостиная",
      "Балкон с видом на парк",
      "Бесплатный Wi-Fi",
    ],
    images: [
      kosmonavtov1,
      kosmonavtov2,
      kosmonavtov3,
      kosmonavtov4,
    ],
    accent: "#3B8EA5",
    guests: 4,
  },
];

import file_1 from "/images/splash.jpg"
const MENU_IMAGES = new URL("/images/menu", import.meta.url).href + "/";
const GLOSSARY_IMAGES = new URL("/images/glossary", import.meta.url).href + "/";

export const courseMenu =
    [
        { pageRoute: "tutorial-page", name: "Введение", image: `${MENU_IMAGES}img-1.jpg` },

        {
            pageRoute: "Page_1", name: "Слайд 1", image: `${MENU_IMAGES}img-2.jpg`,
            scrollPage: [
                { pageRoute: "Page_1", hash: "#menu-Part_1", name: "Часть 1" },
                { pageRoute: "Page_1", hash: "#menu-Part_2", name: "Часть 2" }
            ]
        },
        { pageRoute: "Page_2", name: "Схема 3D", image: `${MENU_IMAGES}img-3.jpg` },

        { pageRoute: "final", name: "Заключение", image: `${MENU_IMAGES}img-2.jpg` },

    ]



export const courseGlossary =
{
    glossaryProps: {
        "title": "Глоссарий",
        "description": "Легко просматривайте все содержимое вашей библиотеки, используя поиск и фильтрацию для скорости и точности поиска",
        "placeholder": "Поиск по глоссарию",
        "sidebarTitle": "Фильтрация",
        "showAllBtnText": "Все типы",
        "showAllFiltersText": "Все фильтры "
    },
    glossaryData: [
        {
            "title": "Каменный уголь",
            "text": "Твердое горючее полезное ископаемое в земной коре, которое залегает в форме пластов.",
            "img": `${GLOSSARY_IMAGES}img-1.jpg`,
            "type": "открытая добыча"
        },
        {
            "title": "Штрек",
            "text": "Обозначение угледобывающего предприятия с «закрытой» (подземной) добычей (при открытых разработках предприятие именуется «разрезом», см. статью «Разрез»). В историческом смысле слова «шахта» — это вертикальная выработка от поверхности до разрабатываемых горизонтов. Слово «шахта» — немецкого происхождения, родственное словам Schaft (‘скребок’) и глаголу shaben (‘скоблить’). Вместо слова «шахта» в значении «предприятие» употреблялись наименования «рудник», либо «копь» (родство с глаголом «копать» очевидно).",
            "img": `${GLOSSARY_IMAGES}img-2.jpg`,
            "type": "закрытая добыча"
        },
        {
            "title": "Шахта",
            "text": "Обозначение угледобывающего предприятия с «закрытой» (подземной) добычей (при открытых разработках предприятие именуется «разрезом», см. статью «Разрез»). В историческом смысле слова «шахта» — это вертикальная выработка от поверхности до разрабатываемых горизонтов. Слово «шахта» — немецкого происхождения, родственное словам Schaft (‘скребок’) и глаголу shaben (‘скоблить’). Вместо слова «шахта» в значении «предприятие» употреблялись наименования «рудник», либо «копь» (родство с глаголом «копать» очевидно).",
            "img": `${GLOSSARY_IMAGES}img-3.jpg`,
            "type": "Производство концентрата"
        },
        {
            "title": "Каменный уголь",
            "text": "Твердое горючее полезное ископаемое в земной коре, которое залегает в форме пластов.",
            "img": `${GLOSSARY_IMAGES}img-1.jpg`,
            "type": "открытая добыча"
        },
        {
            "title": "Штрек",
            "text": "Обозначение угледобывающего предприятия с «закрытой» (подземной) добычей (при открытых разработках предприятие именуется «разрезом», см. статью «Разрез»). В историческом смысле слова «шахта» — это вертикальная выработка от поверхности до разрабатываемых горизонтов. Слово «шахта» — немецкого происхождения, родственное словам Schaft (‘скребок’) и глаголу shaben (‘скоблить’). Вместо слова «шахта» в значении «предприятие» употреблялись наименования «рудник», либо «копь» (родство с глаголом «копать» очевидно).",
            "img": `${GLOSSARY_IMAGES}img-2.jpg`,
            "type": "закрытая добыча"
        },
        {
            "title": "Шахта",
            "text": "Обозначение угледобывающего предприятия с «закрытой» (подземной) добычей (при открытых разработках предприятие именуется «разрезом», см. статью «Разрез»). В историческом смысле слова «шахта» — это вертикальная выработка от поверхности до разрабатываемых горизонтов. Слово «шахта» — немецкого происхождения, родственное словам Schaft (‘скребок’) и глаголу shaben (‘скоблить’). Вместо слова «шахта» в значении «предприятие» употреблялись наименования «рудник», либо «копь» (родство с глаголом «копать» очевидно).",
            "img": `${GLOSSARY_IMAGES}img-3.jpg`,
            "type": "Неведомая Хуета"
        },

        {
            "title": "Каменный уголь",
            "text": "Твердое горючее полезное ископаемое в земной коре, которое залегает в форме пластов.",
            "img": `${GLOSSARY_IMAGES}img-1.jpg`,
            "type": "Неведомая Хуета"
        },

    ]
}

export const courceDownload =
    [
        {
            title: `Большое название с большим словом, у которого непередаваемые ощущения`,
            name: `Перейдите по ссылке, чтобы познакомиться со схемой угледобывающего устройства`,
            link: file_1,
            size: '681 Kb, JPG',
            img: `${MENU_IMAGES}download-1.jpg`,
            icon: 'link'
        },
        {
            title: `Схема Цепочка создания ценностей РУК`,
            name: `Скачайте памятку для постоянного пользования`,
            link: file_1,
            size: '681 Kb, JPG',
            img: `${MENU_IMAGES}download-2.jpg`,
            icon: 'download'
        },

        {
            title: `Схема Цепочка создания ценностей РУК`,
            name: `Скачайте памятку для постоянного пользования`,
            link: file_1,
            size: '681 Kb, JPG',
            img: `${MENU_IMAGES}download-2.jpg`,
            icon: 'download'
        },

        {
            title: `Большое название с большим словом, у которого непередаваемые ощущения`,
            name: `Перейдите по ссылке, чтобы познакомиться со схемой угледобывающего устройства`,
            link: file_1,
            size: '681 Kb, JPG',
            img: `${MENU_IMAGES}download-1.jpg`,
            icon: 'link'
        },
    ]
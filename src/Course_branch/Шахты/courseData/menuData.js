import file_1 from "/images/splash.jpg"
const MENU_IMAGES = new URL("/images/menu", import.meta.url).href + "/";

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
    [
        { "title": "Array", "text": "A collection of elements of the same type stored in contiguous memory locations." },
        { "title": "Table", "text": "A data structure consisting of rows and columns, where each column contains data of the same type." },
        { "title": "List", "text": "A collection of elements of different types, stored in a non-contiguous memory location." },
        { "title": "Dictionary", "text": "A collection of key-value pairs, where each key is unique and maps to a value." },
        { "title": "Set", "text": "A collection of unique elements, where the order of elements is not guaranteed." },
        { "title": "Stack", "text": "A data structure that follows the Last-In-First-Out (LIFO) principle." },
        { "title": "Queue", "text": "A data structure that follows the First-In-First-Out (FIFO) principle." },
        { "title": "Tree", "text": "A hierarchical data structure consisting of nodes, where each node has a parent and zero or more children." },
        { "title": "Graph", "text": "A non-linear data structure consisting of nodes and edges, where each edge connects two nodes." },
        { "title": "Hash Table", "text": "A data structure that maps keys to values, using a hash function to compute an index into an array of buckets." }
    ]



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
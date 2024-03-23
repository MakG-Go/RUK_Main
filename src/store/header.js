import { courseMenu, courseGlossary, courceDownload } from "&/courseData/menuData"

export default {
    namespaced: true,
    state: {
        open: false,
        sidebar: false,
        menu: courseMenu,
        glossary: courseGlossary,
        materials: courceDownload

    },
    getters: {
        menu: (state) => state.menu,
        glossary: (state) => state.glossary,
        materials: (state) => state.materials,
        menuState: (state) => state.open,
        sideBarState: (state) => state.sidebar,
        curentPage: (state) => (name) => state.menu.routs.findIndex((el) => el.pageRoute === name)

    },
    mutations: {
        toggleMenu(state) {
            state.open = !state.open
        },
        togleSidebar(state) {
            state.sidebar = !state.sidebar
        }
    },

    actions: {
        toggleMenu({ commit }) {
            commit('toggleMenu')
        },
        togleSidebar({ commit }) {
            commit('togleSidebar')
        }

    },
}


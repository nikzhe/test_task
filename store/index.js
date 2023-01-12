export const state = () => ({
    userToken: null,
    projects: null,
  })
  
export const getters = {
    isLoggedIn (state) {
        return !!state.userToken;
      },
    getProjects (state) {
        return state.projects;
    }
  }
  
export const mutations = {
    SET_USER_TOKEN (state, userToken) {
        state.userToken = userToken;
        this.$cookies.set('user-token', userToken);
      },
    LOGOUT (state) {
      this.$cookies.remove('user-token');
        state.userToken = null;
      },
    SET_PROJECT_LIST(state, projects) {
        state.projects = projects;
    },
    UPDATE_PROJECT_DATA(state, newData) {
        state.projects = newData;
    },
    SET_BASIC_STORE(state, token) {
      state.userToken = token;
    }
  }
  
export const actions = {
    async setUserToken ({ commit }, data) {
        const response = await this.$axios.$post('https://api.quwi.com/v2/auth/login', data);
        commit('SET_USER_TOKEN', await response.token);
      },
    async logout ({ commit }) {
        commit('LOGOUT');
      },
    async getProjectsList({ commit }) {
        const token = this.$cookies.get('user-token');
        const response = await this.$axios.$get('https://api.quwi.com/v2/projects-manage/index?filters%5Bis_active%5D=1&sort=dta_create', {
            headers: { Authorization: `Bearer ${token}` }
    });
        commit('SET_PROJECT_LIST', response.projects);
    },
    async updateProjectData({ commit }, data) {
      const token = this.$cookies.get('user-token');
      const response = await this.$axios(`https://api.quwi.com/v2/projects-manage/update?id=${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
         },
        method: 'POST',
        data: JSON.stringify({
          "name": data.name,
        })
    });
        commit('UPDATE_PROJECT_DATA', response.projects);
    },
    storeBasicSetup({ commit }) {
      const token = this.$cookies.get('user-token');
      commit('SET_BASIC_STORE', token);
    },
  }
<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>面试程序</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-chip
            class="ma-2"
            color="green"
            text-color="white"
          >
            管理员界面
          </v-chip>
          <v-chip
            class="ma-2"
            color="green"
            text-color="white"
            @click.stop="logout"
          >
            登出
          </v-chip>
        </v-row>
      </v-toolbar-items>
    </v-app-bar>
    
    <v-content>
      <v-container
        fill-height
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="15"
            >
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                @click="deleteItem(item.id)"
              >
                mdi-close
              </v-icon>
            </template>
            </v-data-table>
            <v-btn block color='indigo' class="mr-2" @click="addRes">添加餐厅</v-btn>
          </v-col>
        </v-row>
        <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
          :timeout="3000"
          top
          dark
        >
          <v-icon
            color="white"
            class="mr-3"
          >
            mdi-bell-plus
          </v-icon>
          {{notification}}
          <v-btn
            icon
            @click="snackbar = false"
          >
            <v-icon>
              mdi-close-circle
            </v-icon>
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020 Qian Cui</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          {
            text: '',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: '日', value: 'sunday' },
          { text: '一', value: 'monday' },
          { text: '二', value: 'tuesday' },
          { text: '三', value: 'wednesday' },
          { text: '四', value: 'thursday' },
          { text: '五', value: 'friday' },
          { text: '六', value: 'saturday' },
          { text: '类型', value: 'type' },
          { text: '米其林星', value: 'star' },
          { text: '停车', value: 'parking' },
          { text: '外送', value: 'takeOut' },
          { text: '先交定金', value: 'bookingfee' },
          { text: '评价', value: 'rating' },
          { text: '地理位置', value: 'location' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
        items: [],
        snackbar: false,
        snackbarColor: '',
        notification: '',
      }
    },

    methods: {
      getAll: function() {
        this.$http.get('/api/getAllRes').then( (res) => {
          this.items = res.data;
        })
      },

      addRes: function() {

      },

      deleteItem(resId){
        this.$http.delete('/api/deleteResbyId',{
          params: {
						id : resId
					}
        }).then( () => {
          this.snackbar = true;
          this.notification = '删除成功';
          this.snackbarColor = 'green';
          this.getAll();
        })
      },

      logout: function() {
        this.$router.push({ path: '/' });
      },
    },
    mounted: function() {
      this.getAll();
		}
  }
</script>
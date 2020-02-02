<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>面试程序</v-toolbar-title>
      {{status}}
      <v-spacer />
      <v-toolbar-items>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-btn text @click.stop="adminLoginClick">管理员登录</v-btn>
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Sign in with Google
          </g-signin-button>
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
          <v-col cols="5.5">
            <v-select
              :items="dateItems"
              v-model="selectedDate"
              label="选择日期"
            ></v-select>
          </v-col>
          <v-col cols="5.5">
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="选择时间"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="1">
            <v-btn text @click.stop="findOpenR">搜索</v-btn>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="15"
            >
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            </v-data-table>
          </v-col>
        </v-row>
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

<script src="https://apis.google.com/js/platform.js" async defer></script>
<script>
  export default {
    data() {
      return {
        status: '',
        googleSignInParams: {
          client_id: '9074522593-4v3d150h36t7as9bi79512s856edarsb.apps.googleusercontent.com'
        },
        headers: [
          {
            text: '',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: '类型', value: 'type' },
          { text: '米其林星', value: 'star' },
          { text: '停车', value: 'parking' },
          { text: '外送', value: 'takeOut' },
          { text: '评价', value: 'rating' },
        ],
        items: [],
        dateItems: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        selectedDate: '',
        time: null,
        menu2: false,
        cacheAllRes: []
      }
    },

    methods: {
      adminLoginClick: function(){
        this.$router.push({ path: '/admin' });
      },

      statusChangeCallback: function(response) {
        if (response.status === 'connected') {
          this.status = 'In';
        } else if (response.status === 'not_authorized') {
          this.status = 'false';
        } else {
          this.status = 'false';
        }
      },

      getCurTime: function(){
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        if (hour >= 0 && hour <= 9) {
					hour = "0" + hour;
        };
        if (minute >= 0 && minute <= 9) {
					minute = "0" + minute;
        }
        let curTime = hour.toString() + minute.toString();
        return curTime;
      },

      checkIfOpen: function(openTime, curTime){
        if(openTime != 'Closed'){
          let words = openTime.split('-')
          if(words[0] == '12')
            words[0] = '1200';
          let start = words[0].split(':').join('');
          let end = words[1].split(':').join('');
          if(curTime < start || curTime > end){
            return false;
          }else{
            return true;
          }
        }else{
          return false;
        }
      },

      checkOpenByDayTime: function(day, curTime){
        for(let item of this.cacheAllRes) {
            if(day == 0){
              let openTime = item.sunday;
              let isOpen = this.checkIfOpen(openTime, curTime);
              if(isOpen){
                this.items.push(item);
              }
            }else if(day == 1){
              let openTime = item.monday;
              let isOpen = this.checkIfOpen(openTime, curTime);
              if(isOpen){
                this.items.push(item);
              }
            }else if(day == 2){
              let openTime = item.tuesday;
              let isOpen = this.checkIfOpen(openTime, curTime);
              if(isOpen){
                this.items.push(item);
              }
            }else if(day == 3){
              let openTime = item.wednesday;
              let isOpen = this.checkIfOpen(openTime, curTime);
              if(isOpen){
                this.items.push(item);
              }
            }else if(day == 4){
              let openTime = item.thursday;
              let isOpen = this.checkIfOpen(openTime, curTime);
              if(isOpen){
                this.items.push(item);
              }
            }else if(day == 5){
              let openTime = item.friday;
              let isOpen = this.checkIfOpen(openTime, curTime);
              if(isOpen){
                this.items.push(item);
              }
            }else if(day == 6){
              let openTime = item.saturday;
              let isOpen = this.checkIfOpen(openTime, curTime);
              if(isOpen){
                this.items.push(item);
              }
            }
          }
      },

      findOpenR: function(){
        if(!this.time)
          returm;
        var day=0;
        switch(this.selectedDate){
          case('星期日'):
            day = 0;
            break;
          case('星期一'):
            day = 1;
            break;
          case('星期二'):
            day = 2;
            break;
          case('星期三'):
            day = 3;
            break;
          case('星期四'):
            day = 4;
            break;
          case('星期五'):
            day = 5;
            break;
          case('星期六'):
            day = 6;
            break;
        }
        let curTime = this.time.split(':').join('');
        this.items = [];
        this.checkOpenByDayTime(day, curTime);
      },

      getAll: function() {
        this.$http.get('/api/getAllRes').then( (res) => {
          this.cacheAllRes = res.data;
          let curTime = this.getCurTime();
          let now = new Date();
          let day = now.getDay();
          this.checkOpenByDayTime(day, curTime);
        })
      },
      onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
        const profile = googleUser.getBasicProfile(); // etc etc
      },

      onSignInError(error) {
        // `error` contains any error occurred.
        alert(JSON.stringify(error));
      },
    },
    mounted: function() {
      this.getAll();
		}
  }
</script>
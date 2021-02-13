<template>
  <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
    <a id="show-sidebar" @click="closeMenu" href="#">
      <img src="@/assets/images/menu.svg" alt="" />
    </a>
    <nav id="sidebar" class="sidebar-wrapper">
      <div>
        <div id="mCSB_1" tabindex="0">
          <div id="mCSB_1_container" class="position-relative" dir="ltr">
            <!-- sidebar-brand  -->
            <div class="sidebar-item sidebar-brand d-flex">
              <p class="w-75 m-auto">
                <a href="#">Sous les pavés le vintage</a>
              </p>
              <a id="close-sidebar" href="#" class="w-25" @click="closeMenu">
                <img src="@/assets/images/close.svg" alt="" />
              </a>
            </div>
            <!-- sidebar-header  -->
            <div class="sidebar-item sidebar-header d-flex flex-nowrap">
              <div class="user-info">
                <span class="user-name">
                  {{ name }}
                </span>
              </div>
            </div>
            <!-- sidebar-menu  -->
            <div class=" sidebar-item sidebar-menu">
              <ul>
                <li class="header-menu">
                  <span>Général</span>
                </li>

                <li class="sidebar-dropdown">
                  <a href="#" @click="hideSidebarSmall('newsale')">
                    <img src="@/assets/images/sale.svg" alt="" class="icon" />
                    <span class="menu-text">Créer une nouvelle vente</span>
                  </a>
                </li>
                <li class="sidebar-dropdown">
                  <a href="#" @click="hideSidebarSmall('saleslist')">
                    <img
                      src="@/assets/images/saleList.svg"
                      alt=""
                      class="icon"
                    />
                    <span class="menu-text">Liste des ventes</span>
                  </a>
                </li>
                <li class="sidebar-dropdown">
                  <a href="#" @click="hideSidebarSmall('exportsExcel')">
                    <img
                      src="@/assets/images/download.svg"
                      alt=""
                      class="icon"
                    />
                    <span class="menu-text">Exporter</span>
                  </a>
                </li>
                <li class="sidebar-dropdown">
                  <a href="#" @click="hideSidebarSmall('users')">
                    <img
                      src="@/assets/images/account.svg"
                      alt=""
                      class="icon"
                    />
                    <span class="menu-text">Compte</span>
                  </a>
                </li>
              </ul>
            </div>
            <!-- sidebar-menu  -->
          </div>
        </div>
      </div>
      <div class="sidebar-footer">
        <div>
          <a href="#" @click="logout()">
            <img src="@/assets/images/logout.svg" alt="" class="icon" />
            <span class="menu-text">Se déconnecter</span>
          </a>
        </div>
      </div>
    </nav>
    <!-- page-content  -->
    <main class="page-content py-0">
      <router-view />
    </main>
    <!-- page-content" -->
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "Admin",
  data() {
    return {
      name: null
    };
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    hideSidebarSmall(dest) {
      $(".page-wrapper").toggleClass("toggled");
      var routeDest = "/admin/" + dest;
      this.$router.push(routeDest).catch(err => {
        if (err.name != "NavigationDuplicated") {
          console.error(err);
        }
      });
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    var user = fb.auth().currentUser;
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(snapshot => {
        this.name = snapshot.data().name;
      });
  }
};
</script>

<style scoped lang="scss">
.page-wrapper {
  #show-sidebar {
    padding: 0.5rem;
    background-color: #26734f;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    position: fixed;
    left: 0px;
    top: 0;
    z-index: 10;
  }

  #close-sidebar {
    display: none;
  }

  &.toggled {
    #show-sidebar {
      display: none;
    }

    #close-sidebar {
      display: block;
    }
  }
}
</style>

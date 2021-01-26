<template>
  <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
    <nav id="sidebar" class="sidebar-wrapper">
      <div
        class="sidebar-content mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar desktop"
      >
        <div
          id="mCSB_1"
          class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
          style="max-height: none;"
          tabindex="0"
        >
          <div
            id="mCSB_1_container"
            class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
            style="position:relative; top:0; left:0;"
            dir="ltr"
          >
            <!-- sidebar-brand  -->
            <div class="sidebar-item sidebar-brand">
              <a href="#">Sous les pavés le vintage</a>
            </div>
            <!-- sidebar-header  -->
            <div class="sidebar-item sidebar-header d-flex flex-nowrap">
              <div class="user-info">
                <span class="user-name">
                  Florencia
                  <strong>Lapin</strong>
                </span>
                <span class="user-role">Administration</span>
              </div>
            </div>
            <!-- sidebar-menu  -->
            <div class=" sidebar-item sidebar-menu">
              <ul>
                <li class="header-menu">
                  <span>Général</span>
                </li>

                <li class="sidebar-dropdown">
                  <router-link to="/admin/newsale">
                    <!--<img
                      src="@/assets/images/admin/newarticle.svg"
                      alt=""
                      class="icon"
                    />-->
                    <span class="menu-text">Créer une nouvelle vente</span>
                  </router-link>
                </li>
                <li class="sidebar-dropdown">
                  <router-link to="/admin/saleslist">
                    <!--<img
                      src="@/assets/images/admin/list.svg"
                      alt=""
                      class="icon"
                    />-->
                    <span class="menu-text">Liste des ventes</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- sidebar-menu  -->
          </div>
          <div
            id="mCSB_1_scrollbar_vertical"
            class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical"
            style="display: none;"
          >
            <div class="mCSB_draggerContainer">
              <div
                id="mCSB_1_dragger_vertical"
                class="mCSB_dragger"
                style="position: absolute; min-height: 30px; height: 0px; top: 0px;"
              >
                <div class="mCSB_dragger_bar" style="line-height: 30px;"></div>
              </div>
              <div class="mCSB_draggerRail"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar-footer">
        <div>
          <a href="#" @click="logout()">
            <!--<img src="@/assets/images/admin/logout.svg" alt="" class="icon" />-->
            <span class="menu-text">Se déconnecter</span>
          </a>
        </div>
      </div>
    </nav>
    <!-- page-content  -->
    <main class="page-content py-0 h-100">
      <router-view />
    </main>
    <!-- page-content" -->
  </div>
</template>

<script>
export default {
  name: "Admin",
  methods: {
    closeMenu() {
      //$(".page-wrapper").removeClass("toggled");
    }
  }
};
</script>

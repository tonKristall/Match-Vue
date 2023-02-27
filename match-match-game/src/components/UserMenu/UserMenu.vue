<script lang="ts">
import { useUserStore } from '@/stores/user.store';

export default {
  name: 'UserMenu',

  components: {
    BaseButton: () => import('@/ui/BaseButton.vue'),
    EditProfileForm: () => import('@/components/EditProfileForm/EditProfileForm.vue'),
  },

  data() {
    const { logoutUser, user } = useUserStore();

    return {
      user,
      logoutUser,
      isOpenMenu: false,
      isEditProfile: false,
    };
  },

  methods: {
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
    editProfile() {
      this.toggleMenu();
      this.isEditProfile = true;
    },
    cancelEdit() {
      this.isEditProfile = false;
    },
  },
};
</script>

<template>
  <div class="user-menu">
    <BaseButton class="user-menu__button" type="button" :text="user?.displayName" :handleClick="toggleMenu" />
    <!-- <div class="user-menu__icon" @click="toggleMenu"></div> -->
    <transition name="user-menu-fade">
      <div class="user-menu__list" v-show="isOpenMenu">
        <BaseButton class="user-menu__button" type="button" text="Edit Profile" :handleClick="editProfile" />
        <BaseButton class="user-menu__button" type="button" text="Logout" :handleClick="logoutUser" />
      </div>
    </transition>
    <Portal :isOpen="isEditProfile" :closePortal="cancelEdit" head="Edit Profile">
      <EditProfileForm :cancelEdit="cancelEdit" />
    </Portal>
  </div>
</template>

<style scoped lang="scss">
.user-menu {
  position: relative;

  &__icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: aqua;
    cursor: pointer;
  }

  &__list {
    padding: 10px;
    width: 200px;
    position: absolute;
    top: 45px;
    right: 0;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 24%);
    z-index: 100;
  }

  &__button {
    display: block;
    padding: 0 1rem;
    width: 100%;
    background: none;
    font-size: inherit;
    line-height: 24px;
    text-align: start;

    &:hover {
      border-radius: 0;
      background-color: hsla(160, 100%, 37%, 0.2);
    }
  }
}

.user-menu-fade-enter-active,
.user-menu-fade-leave-active {
  transition: opacity 0.2s;
}
.user-menu-fade-enter,
.user-menu-fade-leave-to {
  opacity: 0;
}
</style>

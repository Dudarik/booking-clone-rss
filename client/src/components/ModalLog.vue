<template>
  <Teleport to="body">
    <transition name="modal-anime">
      <div class="modal" v-if="modalIsShow" @mousedown="closeModal">
        <section v-show="!orderIsCompleted" @mousedown.stop @submit.prevent class="modal__form">
          <span class="modal__form--close" @click="closeModal">X</span>
          <h2 class="modal__form--header">{{ $t('titles.log') }}</h2>
          <section class="modal__form--info">
            <div class="personal-info">
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s6">
                      <i class="material-icons prefix">account_circle</i>
                      <input id="icon_prefix" type="text" class="validate" />
                      <label for="icon_prefix">{{ $t('form.email') }}</label>
                    </div>
                    <div class="input-field col s6">
                      <i class="material-icons prefix">phone</i>
                      <input id="icon_telephone" type="tel" class="validate" />
                      <label for="icon_telephone">{{ $t('form.password') }}</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
        <span v-show="orderIsCompleted" class="modal__success">Completed!</span>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { useModal } from '@/store/modal';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
// import ModalReg from './ModalReg.vue';

const modalStore = useModal();

const { modalIsShow, orderIsCompleted, buyAttemt } = storeToRefs(modalStore);
const closeModal = () => {
  modalStore.$reset();
  modalIsShow.value = false;
  buyAttemt.value = false;
};
watch(modalIsShow, (newModalIsShow) => {
  if (newModalIsShow) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  font-family: 'Poppins', sans-serif;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 15;
  user-select: none;
  &__form {
    flex-basis: 45%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    padding: 1.5rem 3rem;
    background-color: white;
    border-radius: 20px;
    &--close {
      position: absolute;
      top: 10px;
      right: 20px;
      padding: 0.3rem;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        color: black;
      }
    }
    &--header {
      font: {
        family: 'Pacifico', cursive;
        size: 1.6rem;
      }
      margin: 0;
    }
    &--info {
      display: flex;
      gap: 4rem;
      .personal-info {
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
  .modal__success {
    padding: 1rem;
    font-size: 1.5rem;
    color: black;
    background-color: white;
    border: 1px solid white;
    border-radius: 20px;
  }
}
.modal-anime {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0);
  }
  &-leave-active {
    transform: scale(0);
  }
}
</style>

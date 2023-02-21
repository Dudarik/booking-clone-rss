<template>
  <div class="product product-card">
    <RouterLink
      :to="{
        name: RouteNames.product,
        params: { id: `${product.id}` },
      }"
      class="a product-card__head"
    >
      <img class="product__image" :src="product.thumbnail" loading="lazy" />
      <span class="product__heading">{{ product.title }}</span>
    </RouterLink>
    <div class="product-card__body">
      <div class="product-card__info">
        <div class="rating">
          <i class="icon-star rating__icon"></i>
          <span class="rating__value">{{ product.rating }}</span>
        </div>
        <div class="price">
          <span v-if="product.discountPercentage === 0"> ${{ product.actualPrice.toFixed(2) }} </span>
          <span v-else>
            <span class="price__actual">${{ product.actualPrice.toFixed(2) }}</span>
            <span class="price__fixed">${{ product.price.toFixed(2) }}</span>
          </span>
        </div>
      </div>
      <button class="btn cart-btn product-card__cart-btn" :class="cartBtnClass" @click="cartBtnClick">
        <i v-if="!inCart" class="icon-cart-plus cart-btn__icon"></i>
        <i v-else class="icon-cart-ok cart-btn__icon"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from '@/services';
import { useProductInfo } from '@/composables';
import { computed } from 'vue';
import { RouteNames } from '@/router';

const props = defineProps<{
  product: IProduct;
}>();
const { inCart, toggleProduct } = useProductInfo(props.product);
const cartBtnClass = computed(() => {
  if (inCart.value) return 'cart-btn_in-cart';
  else return '';
});
function cartBtnClick(e: Event) {
  e.preventDefault();
  toggleProduct();
}
</script>

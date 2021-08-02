<script lang="ts">
  export let product;
</script>

<div class="container">
  <div class="product-image">
    <div class="tags">
      {#each product.tags as tag}
        <div class="tag">{tag}</div>
      {/each}
    </div>

    <a rel="prefetch" href="shop/{product.id}">
      <img src={product.image} />
    </a>
    <svg viewBox="0 0 100 100">
      <rect width="100%" height="100%" />
    </svg>
  </div>
  <content>
    <a rel="prefetch" href="shop/{product.id}">
      <h3>{product.name}</h3>
    </a>

    <small>{product.description}</small>
    <div class="custom">
      <slot name="custom" />
    </div>
    <p>{product.size}</p>
   {#if product.price} <p>${product.price}</p>{/if}
  </content>
  <button
    class="snipcart-add-itemTODO"
    data-item-id={product.id}
    data-item-price={product.price}
    data-item-url={product.url}
    data-item-description={product.description}
    data-item-image={product.image}
    data-item-name={product.name}
  >
    [COMING SOON!]
  </button>
</div>

<style lang="scss">
  .container {
    padding: 1em;
    border: 1px dashed rgb(220, 220, 220);
    border-radius: 1em;
  }

  .product-image {
    position: relative;
  }

  content {
  }

  .custom {
    display: flex;
    margin: 1em 0;
  }

  .tags {
    position: absolute;
    top: 20px;
    right: -60px;
    z-index: 4;
    $colors: rgb(120, 89, 193), rgb(210, 160, 68), rgb(56, 184, 163),
      rgb(55, 155, 49) rgb(39, 39, 152) ue, rgb(53, 0, 128);

    @for $i from 1 through length($colors) {
      div:nth-child(#{length($colors)}n + #{$i}) {
        background: nth($colors, $i);
        width: fit-content;
        margin: 0.2em;
        color: white;
        transform: skew(5deg, 1deg);
      }
    }
  }

  img {
    width: 100%;
    height: auto;
    z-index: 3;
    position: relative;
    transition: all 0.2s ease-in;
    animation: glow 1.5s ease-in-out infinite alternate-reverse;
    margin-bottom: 1em;

    &:hover {
      transform: scale(0.95) rotate(5deg);
    }
  }

  @keyframes glow {
    from {
      filter: none;
    }
    to {
      filter: contrast(175%) brightness(100%) saturate(150%);
    }
  }

  svg {
    width: 100%;
    height: auto;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.411);

    rect {
      fill: rgb(0, 187, 255);
    }
  }
</style>

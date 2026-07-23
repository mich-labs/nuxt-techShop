<template>
  <template
    v-for="(node, i) in nodes"
    :key="i"
  >
    <component
      :is="`h${node.level}`"
      v-if="node.type === 'heading'"
      class="blocks__heading"
    >
      <app-blocks-renderer :nodes="node.children" />
    </component>

    <p
      v-else-if="node.type === 'paragraph'"
      class="blocks__paragraph"
    >
      <app-blocks-renderer :nodes="node.children" />
    </p>

    <blockquote
      v-else-if="node.type === 'quote'"
      class="blocks__quote"
    >
      <app-blocks-renderer :nodes="node.children" />
    </blockquote>

    <pre
      v-else-if="node.type === 'code'"
      class="blocks__code"
    ><code><app-blocks-renderer :nodes="node.children" /></code></pre>

    <ol
      v-else-if="node.type === 'list' && node.format === 'ordered'"
      class="blocks__list blocks__list--ordered"
    >
      <app-blocks-renderer :nodes="node.children" />
    </ol>

    <ul
      v-else-if="node.type === 'list' && node.format === 'unordered'"
      class="blocks__list"
    >
      <app-blocks-renderer :nodes="node.children" />
    </ul>

    <li
      v-else-if="node.type === 'list-item'"
      class="blocks__list-item"
    >
      <app-blocks-renderer :nodes="node.children" />
    </li>

    <img
      v-else-if="node.type === 'image'"
      :src="node.image.url"
      :alt="node.image.alternativeText || node.image.name"
      class="blocks__image"
    />

    <a
      v-else-if="node.type === 'link'"
      :href="node.url"
      class="blocks__link"
    >
      <app-blocks-renderer :nodes="node.children" />
    </a>

    <template
      v-else-if="
        node.type === 'text' && !node.bold && !node.italic && !node.underline && !node.strikethrough && !node.code
      "
      >{{ node.text }}</template
    >

    <span
      v-else-if="node.type === 'text'"
      :class="{
        'blocks__text--bold': node.bold,
        'blocks__text--italic': node.italic,
        'blocks__text--underline': node.underline,
        'blocks__text--strikethrough': node.strikethrough,
        'blocks__text--code': node.code,
      }"
      >{{ node.text }}</span
    >
  </template>
</template>

<script setup lang="ts">
import type { Block, InlineNode, ListItemBlock } from '~~/cms';

type RenderableNode = Block | ListItemBlock | InlineNode;

defineProps<{ nodes: RenderableNode[] }>();
</script>

<style scoped lang="scss">
.blocks {
  &__heading {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 20px;

    &:not(:first-child) {
      margin-top: 30px;
    }
  }

  &__paragraph {
    font-size: 1.6rem;
    line-height: 20px;
    letter-spacing: -0.02em;
    text-align: justify;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__quote {
    padding-left: 20px;
    border-left: 3px solid var(--ui-1);
    font-style: italic;
    color: var(--text-2);
  }

  &__code {
    padding: 15px;
    border-radius: var(--b-r);
    background-color: var(--bg-2);
    overflow-x: auto;

    code {
      font-family: monospace;
      font-size: 1.4rem;
    }
  }

  &__list {
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 26px;
    letter-spacing: 0.05em;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__list-item {
    list-style-type: disc;
  }

  &__list--ordered &__list-item {
    list-style-type: decimal;
  }

  &__image {
    max-width: 100%;
    height: auto;
    border-radius: var(--b-r);
  }

  &__link {
    color: var(--accent);
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }
  }

  &__text {
    &--bold {
      font-weight: 700;
    }

    &--italic {
      font-style: italic;
    }

    &--underline {
      text-decoration: underline;
    }

    &--strikethrough {
      text-decoration: line-through;
    }

    &--code {
      font-family: monospace;
      font-size: 1.4rem;
      padding: 2px 4px;
      border-radius: 4px;
      background-color: var(--bg-2);
    }
  }
}
</style>

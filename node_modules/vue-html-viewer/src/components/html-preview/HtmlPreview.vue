<template>
  <div class="preview">
    <span v-on:click="toggle" class="switch-btn mb-2">Switch</span>
    <pre class="code-preview" v-if="isPreview">
            {{ htmlData }}
        </pre
    >
    <div class="visual-preview" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HtmlPreview",
  data: () => {
    return {
      isPreview: false,
      htmlData: ""
    };
  },
  methods: {
    toggle: function() {
      this.isPreview = !this.isPreview;
      if (this.isPreview)
        this.htmlData = this.proccessString(
          this.$el.querySelector(".visual-preview").outerHTML
        );
    },
    proccessString: function(string) {
      let div = document.createElement("div");
      div.innerHTML = string.trim();

      return this.formatString(div, 0).innerHTML;
    },
    formatString: function(node, level) {
      let indentBefore = new Array(level++ + 1).join("  "),
        indentAfter = new Array(level - 1).join("  "),
        textNode;

      for (let i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode("\n" + indentBefore);
        this.removeVueAttributes(node.children[i]);
        node.insertBefore(textNode, node.children[i]);

        this.formatString(node.children[i], level);

        if (node.lastElementChild == node.children[i]) {
          textNode = document.createTextNode("\n" + indentAfter);
          node.appendChild(textNode);
        }
      }
      return node;
    },

    removeVueAttributes: function(node) {
      let attributes = node.attributes;
      if (attributes) {
        let keys = Object.keys(attributes);
        for (let i = 0; i < keys.length; i++) {
          const attr = keys[i];
          if (attributes[attr].localName.includes("data-v")) {
            node.attributes.removeNamedItem(attributes[attr].localName);
            keys = Object.keys(attributes);
            i--;
          }
        }
      }

      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          this.removeVueAttributes(node.children[i]);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  background: #d3d3d30f;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
}

.switch-btn {
  right: 5px;
  top: 0;
  background-color: gray;
  padding: 5px;
  align-self: flex-end;
  cursor: pointer;
}
</style>

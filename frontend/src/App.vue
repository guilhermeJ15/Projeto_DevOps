<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const name = ref("")
const value = ref("")

async function loadItems() {
  const res = await fetch("http://localhost:3000/items")
  items.value = await res.json()
}

async function addItem() {
  if (!name.value || !value.value) return;

  await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.value, value: Number(value.value) })
  })

  name.value = ""
  value.value = ""

  loadItems()
}

onMounted(loadItems)
</script>

<template>
  <div style="padding: 20px; max-width: 600px; margin: auto;">
    <h1>Gerenciamento de Itens</h1>

    <h2>Adicionar Item</h2>
    <input v-model="name" placeholder="Nome" />
    <input v-model="value" placeholder="Valor" type="number" />
    <button @click="addItem">Adicionar</button>

    <h2>Itens cadastrados</h2>
    <ul>
      <li v-for="item in items" :key="item._id">
        {{ item.name }} — R$ {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<style>
input {
  margin-right: 10px;
  padding: 5px;
}
button {
  padding: 5px 10px;
}
</style>

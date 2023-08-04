<script>
export default {
  name: "Twitter",
  props: ["hits"],
  setup(props) {
    return { title: `Capitals is awesome!\nI've got ${props.hits} correct answers, can you beat me?`}
  }
}
</script>

<template>
    <button>
        <ShareNetwork
            network="twitter"
            url="https://capitalsui.onrender.com/"
            :title="title"
            description="If you enjoy the game, please spread the word!"
            twitter-user="pmareke">
            <span>Share on Twitter</span>
        </ShareNetwork>
    </button>
</template>


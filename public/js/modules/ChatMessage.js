export default {
    props:['msg'],

    template:`
        <p class="new-message" :class="{'my-message': matchedID}">
            <span>{{msg.message.name}} say:</span>
        </p>
    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id
        }
    }
}
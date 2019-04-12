
export const userCONMsg = {
    props: ['msg'],

    template: `
    <p v-if="matchedID" class="note">{{msg.id}} joined the chat channel!</p>
    <p v-else class="note">{{msg.id}} joined the chat channel!</p>
    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id,
 
        };
    }
};

export const userDCMsg = {
    props: ['msg'],

    template: `
    <p v-if="matchedID" class="note">{{msg.id}} left the chat channel!</p>
    <p v-else class="note">{{msg.id}} left the chat channel!</p>
    `,

    data: function() {
        return {
            matchedID: this.$parent.socketID == this.msg.id,
 
        };
    }
};
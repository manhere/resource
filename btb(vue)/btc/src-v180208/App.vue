<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.sponsor {
    text-align:center;
    font-size:.24rem;
    color:#999;
    margin-top:.48rem;
}
.hbinfo {
    color: #fff;
    text-align: center;
    background-color: #debe6b;
    padding-top: .8rem;
    -webkit-border-radius: 0 0 50% 50% / .16rem .16rem 30% 30%;
    -moz-border-radius: 0 0 50% 50% / .16rem .16rem 30% 30%;
    border-radius: 0 0 50% 50% / .16rem .16rem 30% 30%;
    position: relative;
}

.hbinfo p {
    padding-bottom: 1.25rem;
}

.hbinfo img {
    border-radius: 50%;
    width: 1.28rem;
    height: 1.28rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
}

.btbinfo {
    margin-top: .99rem;
    text-align: center;
    color: #333;
}

.btbinfo img {
    width: .9rem;
    height: .9rem;
}

.btbinfo strong {
    font-size: .8rem;
    margin-right: .05rem;
}

.price {
    font-size: .24rem;
    color: #999;
}

.hbdone {
    font-size: .48rem;
    color: #333;
    margin-top: .18rem;
}

.square {
    color: #1b5a98;
    font-size: .24rem;
    margin-top: .16rem;
}

.square span {
    position: relative;
    padding-right: .2rem;
}

.square span::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -.07rem;
    width: 0;
    height: 0;
    border: .12rem solid;
    margin-top: -.12rem;
    border-color: transparent transparent transparent #eee;
}

.square span::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -.1rem;
    width: 0;
    height: 0;
    border: .12rem solid;
    margin-top: -.12rem;
    border-color: transparent transparent transparent #1b5a98;
}

.slogin {
    font-size: .4rem;
    margin-top: .3rem;
}
.sponsor p:last-child {
    margin-top: .03rem;
}
.makeaddress {
    padding: .32rem;
    background-color: #fff;
    margin-top: .48rem;
    font-size: .28rem;
    color: #333;
}
.makeaddress p:last-child{
    font-size:.48rem;
    color:#666;
    margin-top:.4rem;
    text-align:center;
}
.makeloading {
    font-size: .28rem;
    color: #f44336;
    text-align: center;
    padding: .34rem 0;
}
.asset {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    -webkit-box-shadow: 0 -.02rem .08rem rgba(51, 51, 51, .12);
    -moz-box-shadow: 0 -.02rem .08rem rgba(51, 51, 51, .12);
    box-shadow: 0 -.02rem .08rem rgba(51, 51, 51, .12);
    font-size: .32rem;
    color: #333;
}
.pop {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    background-color: #fff;
    text-align: center;
    width: 75%;
}

.opmask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .54);
    z-index: 99998;
}
</style>

<template>
	<!-- <div class="recruit-content">PageRecruit</div> -->
	<div class="recruit-content">
		<div class="card-pool-select">
			<el-select v-model="card_pool" placeholder="请选择卡池">
				<el-option label="宝石-抽卡" value="pool_1" />
				<el-option label="铜币-抽卡" value="pkg_1" />
			</el-select>
			<el-divider direction="vertical" />
			<span
				>总耗费：{{ consume
				}}{{ this.card_pool ? (this.card_pool == 'pool_1' ? '宝石' : '铜币') : '' }}</span
			>
			<el-divider direction="vertical" />
			<span>总次数：{{ recruitTotalCnt }}</span>
		</div>
		<div class="btn-area">
			<el-button type="info" @click="recruitCard(1)">单抽</el-button>
			<el-button type="danger" @click="recruitCard(5)">五连抽</el-button>
		</div>
		<el-row :gutter="24">
			<el-col :span="4" v-for="(item, idx) in res" :key="idx">
				<el-card shadow="hover" :class="item">{{ item }} </el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { randomRate } from '@utils/recruitRandom.js';
export default {
	name: 'PageRecruit',
	data() {
		return {
			recruitBtnCnt: 0,
			recruitTotalCnt: 0,
			card_pool: '',
			sigle_gold: 199,
			sigle_coin: 300,
			five_gold: 950,
			five_coin: 1388,
			consume: 0,
			res: [],
			reData: [
				{ id: 'gold', rate: 100 },
				{ id: 'purple', rate: 300 },
				{ id: 'blue', rate: 699 },
			],
		};
	},
	methods: {
		randomRate() {},
		recruitCard(cnt) {
			this.res = [];
			let errMsg = '请选择卡池';
			let normalMsg = `点击了${cnt}连抽`;
			ElMessage({
				showClose: true,
				message: this.card_pool ? normalMsg : errMsg,
				type: this.card_pool ? 'success' : 'error',
				effect: 'dark',
				duration: 1000,
			});
			if (!this.card_pool) return;
			for (let i = 0; i < cnt; i++) {
				this.res.push(randomRate(this.reData));
			}
			this.recruitBtnCnt = cnt;
			this.recruitTotalCnt += cnt;
			this.calConsumeAndCnt(cnt);
		},
		calConsumeAndCnt(cnt) {
			switch (this.card_pool) {
				case 'pool_1':
					this.consume += cnt == 1 ? this.sigle_gold : this.five_gold;
					break;
				case 'pkg_1':
					this.consume += cnt == 1 ? this.sigle_coin : this.five_coin;
					break;
			}
		},
	},
	watch: {
		card_pool() {
			// console.log('卡池改变', this.card_pool);
			this.recruitBtnCnt = 0;
			this.res = [];
			this.consume = 0;
			this.recruitTotalCnt = 0;
		},
	},
};
</script>

<style scoped>
.recruit-content {
	width: 60%;
	padding: 80px 60px 60px 80px;
	height: 80%;
}
.card-show {
	display: block;
}
.card-hide {
	display: none;
}
.btn-area {
	width: 100%;
	margin-bottom: 100px;
}
.card-pool-select {
	margin-bottom: 100px;
}
.gold {
	background-color: yellow;
}
.purple {
	background-color: purple;
}
.blue {
	background-color: blue;
}
</style>

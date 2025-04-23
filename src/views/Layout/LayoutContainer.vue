<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores/index'
import { onMounted } from 'vue'
import router from '@/router'
import { ElMessageBox } from 'element-plus'
const useUser = useUserStore()
onMounted(() => {
  useUser.getInfo()
})
const onCommand = async (command) => {
  if(command === 'logout'){
    await ElMessageBox.confirm('您确认退出吗','温馨提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  useUser.removeToken()
  useUser.setInfo({})
  router.push('/login')
  }else router.push(`/user/${command}`)
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <!--
      el-menu 整个菜单组件
      :default-active="$route.path"实现高亮 选择哪个就那个菜单高亮
      router router选项开启后 相当于开启了路由 index就可以实现跳转页面
      el-menu-item 菜单
      index 跳转到那个页面
      -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <!--
        el-sub-menu 是下拉菜单
        在里第一个是具名插槽（插槽固定名称就是title） 是下拉菜单的首页
        再后面写的是默认插槽 是下拉菜单的列表项
        -->
        <el-sub-menu index="/user"> 
          <template #title>
            <!--el-icon 就是用来放图标的 要使用图标就要使用el-icon-->
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>黑马程序员：<strong>{{ useUser.user.nickname || useUser.user.username }}</strong></div>
        <!--
        el-dropdown 是展示给用户看的 相当于首页
        @command 相当于点击事件
        在函数 onCommand可以设置形参 接收列表项中command 的参数
        -->
        <el-dropdown placement="bottom-end" @command="onCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="useUser.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <!--
            el-dropdown-menu 是下拉列表组件
            el-dropdown-item 列表组件的列表项
            el-dropdown-item 中的command只是一个参数
            -->
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2025 Created by 方旭</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
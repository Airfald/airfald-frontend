import React, { useState, useEffect } from 'react'
import { Popover, Menu, Icon, Button, Tabs, Empty } from 'antd'
import * as services from 'services/auth'
import { RootContainer } from '../container'
import styles from './index.module.css'
import logoImg from 'assets/images/logo.svg'
import * as userServices from 'services/fetch-api/user'
import ExportCenter from 'layout/Root/Export'
import storage from 'utils/storage'
import { AuthContainer } from 'containers/auth'
import request from 'services/fetch-api/request'
import * as consts from 'constants/index'
import { OFFICIAL_ACCOUNT_NAME } from 'constants/local'
import Notice from '../Notice'
import classnames from 'classnames'
import { spawn } from 'child_process'
import { value } from 'dom7'

const logout = () => {
  // @ts-ignore
  if (window.gio) {
    // @ts-ignore
    window.gio('clearUserId')
  }

  window.location.href = services.getLogoutUri()
  localStorage.clear()
}

interface IHeadbarProps {
  siderCollapsed?: boolean
  onMenuToggle: () => void
}

const Headbar: React.FC<IHeadbarProps> = function(props) {
  const {
    userInfo: { name },
    userRole: { orgName, roleName },
    roleList,
    roleInfo,
    defaultRole
  } = RootContainer.useContainer()

  const { setToken } = AuthContainer.useContainer()

  const [roleFullName, setRoleFullName] = useState('')
  useEffect(() => {
    setRoleFullName(orgName + roleName)
  }, [orgName])
  const [doubleTabRoleCurTabKey, setDoubleTabRoleCurTabKey] = useState(
    defaultRole[0]
  )

  const changeUserRole = (orgId: any, roleId: any) => {
    userServices
      .changeUserRole({
        roleId,
        orgId
      })
      .then(() => {
        // 删除
        storage.remove(OFFICIAL_ACCOUNT_NAME)
        // 加'/'是因为ng配置问题，只能识别'/console/'
        window.location.href = (process.env.REACT_APP_BASE_NAME as string) + '/'
      })
  }

  /*********************************<只有1个角色>***************************************/
  // const changeRole = (list: Array<any>, index = 0) => {
  //   const { orgId, roleId } = list[index]
  //   changeUserRole(orgId, roleId)
  // }

  // const handleRoleChange = changeRole.bind(null, roleList)

  const getNewToken = async (orgId: any, roleId: any) => {
    await userServices
      .getNewToken()
      .then(token => {
        if (token) {
          // 更新token
          setToken(token)
          request.instance.defaults.headers.common[consts.REQ_AUTH_NAME] = token
          localStorage.setItem(consts.CACHE_TOKEN_NAME, token)
          // 切换角色
          changeUserRole(orgId, roleId)
        }
      })
      .catch(err => {})
  }

  const onChange = (selectedOptions: any) => {
    // 当前用户角色
    const userRoleType = storage.get('ROLETYPE')
    // 选择的用户角色类型
    const roleType = selectedOptions[0].value === 'INSIGHT' ? '/xh/' : '/ss/'
    // 当前角色信息
    const info = selectedOptions[1]

    if (roleType === userRoleType) {
      // 同角色切换，不更新token
      changeUserRole(info.orgId, info.roleId)
    } else {
      // 不同角色切换，获取新的token
      storage.set('ROLETYPE', roleType)
      getNewToken(info.orgId, info.roleId)
    }
  }
  /*********************************<拥有2个角色>***************************************/
  // 拥有2个角色
  const doubleTabRoleContent = (
    <Tabs
      activeKey={doubleTabRoleCurTabKey}
      onChange={key => setDoubleTabRoleCurTabKey(key)}
      className={styles.doubleTabRoleContent}
    >
      {roleInfo.map((r: any) => (
        <Tabs.TabPane tab={r.label} key={r.value}>
          {r.children.length > 0 ? (
            <ul>
              {r.children.map((c: any) => (
                <li
                  key={c.value}
                  className={classnames({
                    [styles.selected]:
                      doubleTabRoleCurTabKey === r.value &&
                      c.value === defaultRole[1]
                  })}
                  onClick={() => onChange([r, c])}
                >
                  {c.label}
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              style={{ marginTop: 10, marginBottom: 10 }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={`暂无${r.label}权限`}
            />
          )}
          <footer onClick={logout}>退出账号</footer>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
  // 只有1个角色
  // const singleTabRoleContent = (
  //   <div className={styles.singleTabRoleContent}>
  //     <header>角色选择</header>
  //     <ul>
  //       {roleList &&
  //         roleList.map((role, index) => (
  //           <li
  //             key={index}
  //             title={role.orgName + role.roleName}
  //             className={classnames({
  //               [styles.selected]: role.value === defaultRole[1]
  //             })}
  //             onClick={() => {
  //               handleRoleChange(index)
  //             }}
  //           >
  //             {role.orgName + role.roleName}
  //           </li>
  //         ))}
  //     </ul>
  //     <footer onClick={logout}>退出账号</footer>
  //   </div>
  // )
  // 无角色
  const noRoleContent = (
    <div className={styles.singleTabRoleContent}>
      <header>角色选择</header>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无权限" />
      <footer onClick={logout}>退出账号</footer>
    </div>
  )

  return (
    <>
      <div className={styles.logo}>
        <img src={logoImg} alt="洞察控制台" />
      </div>
      <div className={styles.menuToggle} onClick={props.onMenuToggle}>
        {props.siderCollapsed ? (
          <Icon type="menu-unfold" style={{ fontSize: '20px' }} />
        ) : (
          <Icon type="menu-fold" style={{ fontSize: '20px' }} />
        )}
      </div>
      <div className={styles.person}>
        <div className={styles.name}>{name}</div>
        {roleInfo && roleInfo.length > 0 ? (
          <Popover
            overlayClassName={styles.popover}
            content={doubleTabRoleContent}
            trigger="click"
            onVisibleChange={visible => {
              if (!visible) {
                setDoubleTabRoleCurTabKey(defaultRole[0])
              }
            }}
            placement="bottomRight"
          >
            <span className={styles.roleNameWrap}>
              {roleFullName.length > 0 ? (
                <span className={styles.roleName}>{roleFullName}</span>
              ) : (
                <div className={styles.roleNameNoAuth}>暂无权限</div>
              )}
              <Icon type="caret-down" />
            </span>
          </Popover>
        ) : (
          <Popover
            overlayClassName={styles.popover}
            content={noRoleContent}
            trigger="click"
            placement="bottomRight"
          >
            <span className={styles.roleNameWrap}>暂无权限</span>
          </Popover>
        )}
      </div>
      <Notice />
      <ExportCenter />
    </>
  )
}

export default Headbar

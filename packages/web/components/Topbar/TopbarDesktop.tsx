import { css, cx } from '@emotion/css'
import Avatar from './Avatar'
import SearchBox from './SearchBox'
import SettingsButton from './SettingsButton'
import NavigationButtons from './NavigationButtons'
import uiStates from '@/web/states/uiStates'
import { useSnapshot } from 'valtio'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '@/web/utils/const'
import { useLocation } from 'react-router-dom'
import player from '@/web/states/player'
import BlurBackground from '../BlurBackground'

const Background = () => {
  // keep background
  const { hideTopbarBackground } = useSnapshot(uiStates)
  const location = useLocation()
  const isPageHaveBlurBG =
    location.pathname.startsWith('/album/') ||
    location.pathname.startsWith('/artist/') ||
    location.pathname.startsWith('/playlist/') ||
    location.pathname.startsWith('/lyrics/')
  const show = !hideTopbarBackground || !isPageHaveBlurBG
  // const show = !hideTopbarBackground

  return (
    <>
      <AnimatePresence>
        {
          <>
            <div className={cx('absolute inset-0 h-full w-full ')}>
              {
              show &&
               <motion.div
                className={cx(
                  'absolute inset-0 z-0 h-full w-full ease',
                  css`
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center top 20%;
                  `
                )}
                style={{ backgroundImage: `url(${player.track?.al.picUrl})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
              </motion.div>
              }
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease }}
                className={cx(
                  'relative inset-0 z-0 ',
                  'h-full w-full',
                  show && 'bg-white/40 dark:bg-black/40',
                  show && 'backdrop-blur-4xl',
                  window.env?.isElectron && 'rounded-tr-24 rounded-tl-24'
                )}
                style={{

                }}
              >

              </motion.div>
            </div>
          </>
        }
      </AnimatePresence>
    </>
  )
}

const TopbarDesktop = () => {
  return (
    <div
      className={cx(
        // app-region-drag 删除后即可移动console
        'app-region-drag',
        ' fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-contain ',
        'pt-11 pb-10 pr-6',
        css`
          padding-left: 144px;
        `
      )}
    >
      {/* Background */}
      <Background />
      {/* Left Part */}
      <div className='z-10 flex items-center'>
        <NavigationButtons />
        {/* Dividing line */}
        <div className='mx-6 h-4 w-px bg-black/20 dark:bg-white/20'></div>

        <SearchBox />
      </div>

      {/* Right Part */}
      <div className='z-10 flex'>
        <SettingsButton />
        <Avatar className='ml-3 h-12 w-12' />
      </div>
    </div>
  )
}

export default TopbarDesktop

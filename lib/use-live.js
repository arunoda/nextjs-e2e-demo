import { useEffect } from "react";
import { useRouter } from 'next/router'

export function useLive(options = {}) {
    const interval = options.interval || 1000;
    const { asPath } = useRouter()
    
    useEffect(() => {
        const buildId = __NEXT_DATA__['buildId']
        let currentPage = null;
        let timeoutHandler = null;

        if (buildId === 'development') {
            return
        }
        
        const checkEtag = () => {
            const pageUrl = `${location.origin}${asPath}`
            const dataUrl = `${location.origin}/_next/data/${buildId}${asPath}.json`
            fetch(pageUrl)
                .then(res => res.text())
                .then(html => {
                    if (!currentPage) {
                        currentPage = html
                    }

                    if (currentPage !== html) {
                        console.log('Reloading')
                        // This is clear the cache in the local for the data file
                        // This is due to stale-while-revalidate cache header
                        fetch(dataUrl)
                        location.reload();
                    }

                    timeoutHandler = setTimeout(checkEtag, interval)
                })
        }

        checkEtag()

        return () => clearTimeout(timeoutHandler)
    }, [asPath])
}
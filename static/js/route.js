export default function Route({ $app, routes }) {  
    this.routes = routes    

    this.route =  () => {
        const potentialMatches = routes.map(route => {
            return {
                route,
                result: location.pathname.match(this.pathToRegex(route.path))
            }
        })

        let match =  potentialMatches.find(route => route.result !== null)
        
    
        if(!match){
            match = {
                route: this.routes[0]
            }
            history.replaceState(null, null, `${ match.route.path }`)
        }

        const props = this.getParams(match)


        this.clear()

        new match.route.view({
             $app,
             $route: this,
             props: props
            })
        
    
    }
    
    this.push = url => {
        history.pushState(null, null, url)
        this.route()
    }

    document.addEventListener('DOMContentLoaded', () => {
        this.route()
    })
 
    window.addEventListener('popstate', () => {        
        this.route()
    })

    this.clear = () => {
        $app.innerHTML = ''
    }

    this.pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + "$")
    
    this.getParams = match => {
        const values = match.result.slice(1);
        
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

        return Object.fromEntries(keys.map((key,i) => {
            return [key, values[i]]
        }))
    }

    
}


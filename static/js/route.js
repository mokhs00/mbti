export default function Route({ $app, routes }) {  
    this.routes = routes    

    this.route = () => {
        let matchPath = routes.find(route => route.path === location.pathname)

    
        if(!matchPath){
            matchPath = routes[0]
        }
    
    
        history.pushState(null, null, matchPath.path)        

        console.log(matchPath);
        console.log($app);
        console.log(this.pathToRegex('/result/:id'));

        this.clear()
        new matchPath.view({
             $app,
             $route: this 
            })
        
    
    }
    
    this.push = url => {
        history.pushState(null, null, url)
        this.route()
    }

    document.addEventListener('DOMContentLoaded', () => {
        this.route()        
    })
 
    document.addEventListener('popstate', () => {
        this.route()        
    })

    this.clear = () => {
        $app.innerHTML = ''
    }

    this.pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + "$")


    
}


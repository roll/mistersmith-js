class Application

  # Public

  constructor: ->
    @modules = []

  run: =>
    route = $('body').data('route')
    for module in @modules
      if not module.routes
        module.run()
      if route in module.routes
        module.run()

  register: (module) =>
    @modules.push(module)


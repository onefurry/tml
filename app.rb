require 'sinatra'
require 'redis'

# Use localhost if no redis url set.
if ENV['REDIS_URL'] == nil
  ENV['REDIS_URL'] = 'redis://localhost'
end

# Uses env["REDIS_URL"]
$r = Redis.new

# Set up any uninitialized redis values.
$r.setnx('tml:gamecount', '0')

get '/' do
  erb :index
end

get '/e' do
  erb :editor
end

get '/g/:gamename' do
  erb :player
end

# Retrieve a game's data.
get '/d/:gamename' do
  $r.get("tml:game:#{params['gamename']}")
end

# Save/update a game's data.
get '/s/:gamename' do
  g = "tml:game:#{params['gamename']}"
  if params['key'] == $r.get("#{g}:key") && $r.exists(g)
    $r.set(g, params['data'])
    "OK"
  else
    "NOT AUTHORIZED"
  end
end

# Create a new game.
get '/c/:gamename' do
  g = "tml:game:#{params['gamename']}"
  if !$r.exists(g)
    $r.set(g, params['data'])
    $r.set("#{g}:key", params['key'])
    $r.incr("tml:gamecount")
    "OK"
  else
    "ALREADY EXISTS"
  end
end

# Check the validity of a key.
get '/k/:gamename' do
  (params['key'] ==
    $r.get("tml:game:#{params['gamename']}:key")) ? 'true' : 'false'
end

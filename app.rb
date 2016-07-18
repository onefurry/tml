require 'sinatra'
require 'redis'

# Use localhost if no redis url set.
if ENV['REDIS_URL'] == nil
  ENV['REDIS_URL'] = 'redis://localhost'
end

# Uses env["REDIS_URL"]
$r = Redis.new

# Set up any uninitialized redis values.
$r.setnx('tml:counterfun', '0')

helpers do
  # Returns the number of saved TML games in our registry.
  # The test counter variable is just a placeholder until the game storage is
  # coded properly.
  def n_games
    $r.get('tml:counterfun')
  end
end

get '/' do
  erb :index
end

get '/editor' do
  erb :nyi
end

get '/increase' do
  $r.incr('tml:counterfun')
  redirect to '/'
end

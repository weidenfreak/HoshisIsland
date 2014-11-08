# -*- encoding : utf-8 -*-
class Sticky < ActiveRecord::Base
  geocoded_by :address
end

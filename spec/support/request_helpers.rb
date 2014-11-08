# -*- encoding : utf-8 -*-
module Requests
  module JsonHelpers
    def json
      @json ||= JSON.parse(response.body)
    end
  end
end

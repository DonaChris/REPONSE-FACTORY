@if (session()->has('statusMsg'))
    <div class="col-lg-12">
        <div
            class="alert alert-{{ session()->get('statusMsg')['type'] }} alert-dismissible formidable_blocStatusMessage">
            <h5 class="text-{{ session()->get('statusMsg')['type'] }}">
                <em class="icon ni ni-{{ session()->get('statusMsg')['icon'] }}"></em>
                {{ session()->get('statusMsg')['title'] }}
            </h5>
            @if (!empty(session()->get('statusMsg')['data']))
                @foreach (session()->get('statusMsg')['data'] as $msgKey => $msgContent)
                    <p>
                        <em class="icon ni ni-dot"></em>
                        {!! gettype($msgContent) == 'array' ? $msgContent[0] : $msgContent !!}
                    </p>
                @endforeach
            @endif
            <button style="z-index: 99999; position: absolute; right: 10px; top: 6px; color: inherit; font-size: 18px;"
                class="close" data-bs-dismiss="alert">
                <i class="fa fa-times"></i>
            </button>
        </div>
    </div>
    @if (session()->get('statusMsg')['type'] != 'success')
        <input type="hidden" id="formErrors" value="{{ json_encode(session()->get('statusMsg')['data'], true) }}">
    @endif
@endif

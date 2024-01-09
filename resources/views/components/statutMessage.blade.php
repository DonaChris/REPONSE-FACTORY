@if (!empty($statusMsg))
    <div class="col-lg-12">
        <div class="alert alert-{{ $statusMsg['type'] }} alert-dismissible formidable_blocStatusMessage">
            <h5 class="text-{{ $statusMsg['type'] }} mb-3">
                <em class="icon ni ni-{{ $statusMsg['icon'] }}"></em>
                {{ $statusMsg['title'] }}
            </h5>
            @if (!empty($statusMsg['data']))
                @foreach ($statusMsg['data'] as $msgKey => $msgContent)
                    <p>
                        <em class="icon ni ni-dot"></em>
                        {!! gettype($msgContent) == 'array' ? $msgContent[0] : $msgContent !!}
                    </p>
                @endforeach
            @endif
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
@endif

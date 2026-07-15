import React from "react";
import { useDispatch } from "react-redux";
import { setAdminTab, setTab } from "../../store";
import { LogOut, Plus, Trash2 } from "lucide-react";
import { useBackOfficePortal } from "./useBackOfficePortal";
import AdminLoginSection from "./AdminLoginSection";
import GuestDashboard from "./GuestDashboard";
import GalleryTab from "./GalleryTab";
import type { BackOfficeProps } from "./types";

function BackOfficeSection(props: BackOfficeProps) {
  return (
    <div className="w-full bg-slate-50 min-h-screen animate-fade-in">
      <div className="bg-slate-950 text-white py-4 px-6 md:px-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-100">{props.userName} ({props.userRole})</span>
        </div>
        <div className="flex gap-3">
          <button onClick={props.onGoToWebsite} className="text-xs font-mono font-medium border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-200 px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95 font-sans">Go to Website</button>
          <button onClick={props.onLogout} className="text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-750 text-white px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 font-sans"><LogOut className="w-3.5 h-3.5" />Logout</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4 font-mono text-xs font-bold">
          <button onClick={() => props.onSetAdminTab("RESERVATIONS")} className={`px-4 py-2.5 rounded-lg transition-all border cursor-pointer ${props.adminTab === "RESERVATIONS" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border-slate-200"}`}>Reservations ({props.reservations.length})</button>
          {props.isOwner && <button onClick={() => props.onSetAdminTab("STATS")} className={`px-4 py-2.5 rounded-lg transition-all border cursor-pointer ${props.adminTab === "STATS" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border-slate-200"}`}>Revenue Dashboard</button>}
          {props.isOwner && <button onClick={() => props.onSetAdminTab("STAFF")} className={`px-4 py-2.5 rounded-lg transition-all border cursor-pointer ${props.adminTab === "STAFF" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border-slate-200"}`}>Staff Accounts</button>}
          {props.isOwner && <button onClick={() => props.onSetAdminTab("ROOMS_CONTROL")} className={`px-4 py-2.5 rounded-lg transition-all border cursor-pointer ${props.adminTab === "ROOMS_CONTROL" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border-slate-200"}`}>Rooms Maintenance & Rates</button>}
          <button onClick={() => props.onSetAdminTab("ENQUIRIES")} className={`px-4 py-2.5 rounded-lg transition-all border cursor-pointer ${props.adminTab === "ENQUIRIES" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border-slate-200"}`}>Conference Enquiries ({props.enquiries.length})</button>
          <button onClick={() => props.onSetAdminTab("GALLERY")} className={`px-4 py-2.5 rounded-lg transition-all border cursor-pointer ${props.adminTab === "GALLERY" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border-slate-200"}`}>Gallery Manager</button>
        </div>
        {props.adminTab === "RESERVATIONS" && <ReservationsTab {...props} />}
        {props.adminTab === "STATS" && props.isOwner && <StatsTab {...props} />}
        {props.adminTab === "STAFF" && props.isOwner && <StaffTab {...props} />}
        {props.adminTab === "ROOMS_CONTROL" && props.isOwner && <RoomsTab {...props} />}
        {props.adminTab === "ENQUIRIES" && <EnquiriesTab {...props} />}
        {props.adminTab === "GALLERY" && <GalleryTab />}
      </div>
    </div>
  );
}

function ReservationsTab(props: BackOfficeProps) {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const renderPaymentCell = (booking: any) => {
    const paymentText = booking.paymentMessage || "";
    const imageSources = Array.from(new Set(paymentText.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[^\s]+/g) || []));
    const displayText = paymentText
      .replace(/\[ATTACHMENT_PREVIEW\]/gi, "")
      .replace(/data:image\/[a-zA-Z0-9.+-]+;base64,[^\s]+/g, "")
      .trim();

    const renderLinkedText = (text: string) => {
      const parts = text.split(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi);
      return parts.map((part, index) => {
        if (!part) return null;
        const isLink = /^https?:\/\//i.test(part) || /^www\./i.test(part);
        if (!isLink) {
          return <span key={`${part}-${index}`}>{part}</span>;
        }
        const href = /^www\./i.test(part) ? `https://${part}` : part;
        return (
          <a
            key={`${part}-${index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-700 underline break-all"
          >
            {part}
          </a>
        );
      });
    };

    return (
      <div className="space-y-2">
        <button
          onClick={() => props.onTogglePayment(booking.id, booking.paymentStatus)}
          className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${booking.paymentStatus === "RECEIVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"}`}
        >
          {booking.paymentStatus}
        </button>
        {booking.paymentMessage ? (
          <div className="rounded-md border border-amber-200 bg-amber-50 p-2 text-[10px] text-amber-800">
            <div className="font-bold uppercase tracking-wide mb-1">Receipt</div>
            {displayText ? (
              <div className="whitespace-pre-wrap break-words leading-relaxed">{renderLinkedText(displayText)}</div>
            ) : (
              <div className="text-slate-400">No text message attached.</div>
            )}
            {imageSources.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {imageSources.map((src, index) => (
                  <button
                    key={`${src.slice(0, 20)}-${index}`}
                    type="button"
                    onClick={() => setPreviewImage(src)}
                    className="cursor-pointer overflow-hidden rounded-md border border-slate-200 bg-slate-50 p-1 shadow-sm"
                  >
                    <img
                      src={src}
                      alt={`Uploaded receipt screenshot ${index + 1}`}
                      className="h-20 w-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-[10px] text-slate-400">No receipt submitted</div>
        )}
      </div>
    );
  };

  return (
    <>
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] rounded-2xl border border-slate-700 bg-white p-3 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-white"
            >
              Close
            </button>
            <img src={previewImage} alt="Receipt preview" className="max-h-[80vh] max-w-[80vw] rounded-xl object-contain" />
          </div>
        </div>
      )}
      <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 font-mono text-xs">
        <div className="flex-1"><input type="text" placeholder="Search bookings by code, name, phone, room..." value={props.searchTerm} onChange={(e) => props.onSearchTermChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 outline-none transition-all" /></div>
        <div className="flex gap-4"><select value={props.statusFilter} onChange={(e) => props.onStatusFilterChange(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none"><option value="">All Statuses</option><option value="BOOKED">BOOKED</option><option value="CHECKED_IN">CHECKED_IN</option><option value="CHECKED_OUT">CHECKED_OUT</option><option value="CANCELLED">CANCELLED</option></select><select value={props.paymentFilter} onChange={(e) => props.onPaymentFilterChange(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none"><option value="">All Payments</option><option value="PENDING">PENDING</option><option value="RECEIVED">RECEIVED</option></select></div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden font-mono text-xs"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><th className="p-4">Reference</th><th className="p-4">Guest Details</th><th className="p-4">Room & Floor</th><th className="p-4">Stay Dates</th><th className="p-4">Status</th><th className="p-4">Payment</th><th className="p-4">Quote (ETB)</th><th className="p-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{props.reservations.length === 0 ? <tr><td colSpan={8} className="p-8 text-center text-slate-400">No active reservation matching filter log found in the database.</td></tr> : props.reservations.map((booking) => <tr key={booking.id} className="hover:bg-slate-50/55 transition-colors"><td className="p-4 font-bold text-slate-950">{booking.id}</td><td className="p-4"><span className="font-bold text-slate-900 font-sans block">{booking.fullName}</span><span className="text-slate-400 text-[10px]">{booking.phone} • {booking.purpose}</span></td><td className="p-4"><span className="font-bold text-slate-800">Room {booking.roomNumber || "None"}</span><span className="text-slate-400 text-[10px] block">{booking.roomType?.name}</span></td><td className="p-4"><span className="block">{new Date(booking.checkIn).toLocaleDateString()}</span><span className="text-slate-400 text-[10px] block">to {new Date(booking.checkOut).toLocaleDateString()}</span></td><td className="p-4"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${booking.status === "BOOKED" ? "bg-indigo-100 text-indigo-800" : booking.status === "CHECKED_IN" ? "bg-emerald-100 text-emerald-800" : booking.status === "CHECKED_OUT" ? "bg-blue-100 text-blue-800" : "bg-rose-100 text-rose-800"}`}>{booking.status}</span></td><td className="p-4 min-w-[240px]">{renderPaymentCell(booking)}</td><td className="p-4 font-bold text-slate-900">ETB {booking.totalPrice.toLocaleString()}</td><td className="p-4 text-right"><div className="flex justify-end gap-1.5 flex-wrap">{booking.status === "BOOKED" && <button onClick={() => props.onStatusChange(booking.id, "CHECKED_IN")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded text-[10px] transition-colors cursor-pointer">Check In</button>}{booking.status === "CHECKED_IN" && <button onClick={() => props.onStatusChange(booking.id, "CHECKED_OUT")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded text-[10px] transition-colors cursor-pointer">Check Out</button>}{["BOOKED", "CHECKED_IN"].includes(booking.status) && <button onClick={() => props.onCancelReservation(booking.id)} className="border border-rose-200 hover:border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold px-2 py-1 rounded text-[10px] transition-all cursor-pointer">Cancel</button>}{props.isOwner && <button onClick={() => props.onDeleteReservation(booking.id)} className="bg-rose-600 hover:bg-rose-700 text-white font-bold p-1 rounded transition-colors cursor-pointer" title="Permanently Delete Booking (Owner Exclusive)"><Trash2 className="w-3.5 h-3.5" /></button>}</div></td></tr>)}</tbody></table></div></div>
      </div>
    </>
  );
}

function StatsTab(props: BackOfficeProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6"><StatCard label="Cumulative Income" value={`ETB ${props.stats?.cumulativeRevenue.toLocaleString() || 0}`} note="✓ Logged Cash Receipts" /><StatCard label="Pending Collections" value={`ETB ${props.stats?.pendingRevenue.toLocaleString() || 0}`} note="▲ Unpaid Checked-in/Booked" /><StatCard label="Today Occupancy Rate" value={`${props.stats?.occupancyRate || 0}%`} note={`${props.stats?.occupiedRoomsCount || 0} of ${props.stats?.totalRoomsCount || 0} Rooms occupied`} /><StatCard label="Active Reservations" value={`${props.stats?.totalActiveReservations || 0} Bookings`} note="Excludes cancelled records" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 lg:col-span-2 flex flex-col justify-between"><div><div className="flex justify-between items-center mb-6"><div><h4 className="text-lg font-bold text-slate-950">Monthly Summary Reporting</h4><p className="text-[10px] font-mono text-slate-400">Historical occupancy rates and compiled revenues</p></div><button onClick={() => alert("Simulating Report Download... CSV generated containing historical occupancy rates!")} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2 rounded text-[10px] font-mono cursor-pointer transition-all">Download CSV Report</button></div><div className="overflow-x-auto font-mono text-xs"><table className="w-full text-left"><thead><tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><th className="p-3">Report Month</th><th className="p-3">Confirmed Bookings</th><th className="p-3">Occupied Nights</th><th className="p-3 text-right">Revenue Yield</th></tr></thead><tbody className="divide-y divide-slate-50">{props.monthlyReports.length === 0 ? <tr><td colSpan={4} className="p-4 text-center text-slate-400">No monthly historical records seeded yet.</td></tr> : props.monthlyReports.map((r, i) => <tr key={i} className="hover:bg-slate-50/50"><td className="p-3 font-bold text-slate-900">{r.month}</td><td className="p-3">{r.bookingsCount}</td><td className="p-3">{r.occupiedNights} Nights</td><td className="p-3 font-bold text-emerald-600 text-right">ETB {r.revenue.toLocaleString()}</td></tr>)}</tbody></table></div></div></div><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between"><div><h4 className="text-lg font-bold text-slate-950 mb-1">Payment Audit Trails</h4><p className="text-[10px] font-mono text-slate-400 mb-6">Immutable history logs of payment alterations</p><div className="space-y-4 max-h-96 overflow-y-auto pr-2 font-mono text-[10px] leading-relaxed">{props.auditLogs.length === 0 ? <p className="text-slate-400 text-center py-8">No payment audit logs recorded yet.</p> : props.auditLogs.map((log) => <div key={log.id} className="bg-slate-50 p-3 rounded-lg border border-slate-150"><div className="flex justify-between items-center mb-1 font-bold text-slate-500"><span>User: {log.user.name}</span><span>{new Date(log.timestamp).toLocaleTimeString()}</span></div><p className="text-slate-900 font-medium">Ref: {log.bookingId}</p><p className="text-slate-600 mt-1">{log.details}</p></div>)}</div></div></div></div>
    </div>
  );
}

function StaffTab(props: BackOfficeProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 lg:col-span-2"><h4 className="text-lg font-bold text-slate-950 mb-1">Staff Roster</h4><p className="text-[10px] font-mono text-slate-400 mb-6">Authorized users roster and roles matrix</p><div className="overflow-x-auto font-mono text-xs"><table className="w-full text-left"><thead><tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><th className="p-3">Staff Member</th><th className="p-3">Email Address</th><th className="p-3">Role</th><th className="p-3">Status</th><th className="p-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-50">{props.staff.map((s) => <tr key={s.id} className="hover:bg-slate-50/50"><td className="p-3 font-sans font-bold text-slate-950">{s.name}</td><td className="p-3">{s.email}</td><td className="p-3"><span className={`px-2 py-0.5 rounded text-[9px] font-bold ${s.role === "OWNER" ? "bg-indigo-100 text-indigo-900" : "bg-slate-100 text-slate-800"}`}>{s.role}</span></td><td className="p-3"><span className={`px-2 py-0.5 rounded text-[9px] font-bold ${s.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>{s.status}</span></td><td className="p-3 text-right"><div className="flex justify-end gap-2">{s.role !== "OWNER" && <button onClick={() => props.onToggleStaffStatus(s.id, s.status)} className={`font-bold px-2 py-1 rounded text-[9px] transition-all border cursor-pointer ${s.status === "ACTIVE" ? "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100" : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"}`}>{s.status === "ACTIVE" ? "Suspend" : "Activate"}</button>}{s.role !== "OWNER" && <button onClick={() => props.onDeleteStaff(s.id)} className="bg-rose-600 hover:bg-rose-700 text-white p-1 rounded cursor-pointer" title="Delete account permanently"><Trash2 className="w-3.5 h-3.5" /></button>}</div></td></tr>)}</tbody></table></div></div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 font-mono text-xs"><h4 className="text-lg font-bold text-slate-950 mb-1 font-sans">Create Staff Profile</h4><p className="text-slate-400 mb-6">Provision authorized credentials</p><form onSubmit={props.onCreateStaffSubmit} className="space-y-4"><div className="flex flex-col gap-1"><label className="font-bold text-slate-700">Staff Email Address *</label><input type="email" required placeholder="e.g. tigist@dream-hotel.com" value={props.newStaffEmail} onChange={(e) => props.onNewStaffEmailChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950" /></div><div className="flex flex-col gap-1"><label className="font-bold text-slate-700">Staff Full Name *</label><input type="text" required placeholder="e.g. Tigist Alene" value={props.newStaffName} onChange={(e) => props.onNewStaffNameChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950" /></div><div className="flex flex-col gap-1"><label className="font-bold text-slate-700">Access Password *</label><input type="password" required placeholder="e.g. staffPassword123" value={props.newStaffPassword} onChange={(e) => props.onNewStaffPasswordChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950" /></div><div className="flex flex-col gap-1"><label className="font-bold text-slate-700">Access Permission Role *</label><select value={props.newStaffRole} onChange={(e) => props.onNewStaffRoleChange(e.target.value as "RECEPTION" | "OWNER")} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950"><option value="RECEPTION">RECEPTION (Front-Desk Operator)</option><option value="OWNER">OWNER (Super-Administrator)</option></select></div>{props.staffError && <div className="bg-rose-50 border border-rose-100 text-rose-700 p-2 rounded-lg font-bold">✕ Error: {props.staffError}</div>}{props.staffSuccess && <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-2 rounded-lg font-bold">✓ Staff profile created successfully!</div>}<button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-1 cursor-pointer font-sans"><Plus className="w-4 h-4 text-white" /> Create Account</button></form></div>
    </div>
  );
}

function RoomsTab(props: BackOfficeProps) {
  const uniqueRoomTypes = props.rooms.reduce((acc: BackOfficeProps["rooms"], room) => {
    if (!acc.some((item) => item.roomTypeId === room.roomTypeId)) acc.push(room);
    return acc;
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"><h4 className="text-lg font-bold text-slate-950 mb-1">Dynamic Tariff Configurations</h4><p className="text-[10px] font-mono text-slate-400 mb-6">CRUD controls for standardized room classifications</p><div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">{uniqueRoomTypes.map((room) => <div key={room.roomType.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4"><div><div className="flex justify-between items-start mb-2"><strong className="text-slate-900 text-sm font-sans">{room.roomType.name}</strong><span className="text-indigo-600 font-bold text-sm">ETB {room.roomType.rate.toLocaleString()} / night</span></div><p className="text-slate-500 mb-1">Bed Configuration: {room.roomType.bedConfig}</p><p className="text-slate-600 text-[11px] leading-relaxed mb-3">{room.roomType.description}</p></div>{props.editingRoomTypeId === room.roomType.id ? <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200"><div className="flex flex-col gap-1"><label className="font-bold text-slate-700">Update Night Rate (ETB) *</label><input type="number" required value={props.editingRate} onChange={(e) => props.onEditingRateChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 outline-none" placeholder={room.roomType.rate.toString()} /></div><div className="flex flex-col gap-1"><label className="font-bold text-slate-700">Update Description *</label><textarea required value={props.editingDescription} onChange={(e) => props.onEditingDescriptionChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 outline-none" placeholder={room.roomType.description} /></div><div className="flex gap-2"><button onClick={() => props.onSaveRoomRate(room.roomType.id)} className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded cursor-pointer">Save Rate</button><button onClick={props.onCancelRoomEdit} className="border border-slate-200 text-slate-600 font-bold px-3 py-1.5 rounded cursor-pointer">Cancel</button></div></div> : <button onClick={() => props.onEditRoomType(room.roomType.id, room.roomType.rate.toString(), room.roomType.description)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg self-start transition-all cursor-pointer font-sans">Modify Tariffs</button>}</div>)}</div></div><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"><h4 className="text-lg font-bold text-slate-950 mb-1">Room Inventory & Maintenance Status</h4><p className="text-[10px] font-mono text-slate-400 mb-6">Switch rooms to Under Maintenance to instantly remove them from availability calendars</p><div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 font-mono text-xs">{props.rooms.map((room) => <div key={room.roomNumber} className={`p-4 rounded-xl border flex flex-col justify-between items-center text-center gap-3 ${room.status === "MAINTENANCE" ? "bg-rose-50 border-rose-200 text-rose-900" : "bg-slate-50 border-slate-200 text-slate-900"}`}><div><span className="text-xs text-slate-400 block uppercase font-bold tracking-widest">{room.floor}</span><strong className="text-sm block font-sans">Room {room.roomNumber}</strong><span className="text-[9px] text-slate-500 block leading-tight mt-0.5">{room.roomType.name}</span></div><button onClick={() => props.onToggleRoomMaintenance(room.roomNumber, room.status)} className={`w-full font-bold py-1.5 rounded text-[9px] transition-all cursor-pointer ${room.status === "MAINTENANCE" ? "bg-rose-600 text-white" : "bg-slate-950 text-white hover:bg-slate-800"}`}>{room.status === "MAINTENANCE" ? "Clear Flag" : "Block Room"}</button></div>)}</div></div>
    </div>
  );
}

function EnquiriesTab(props: BackOfficeProps) {
  return <div className="space-y-6"><div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-mono text-xs"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><th className="p-4">Organizer</th><th className="p-4">Organization</th><th className="p-4">Event & Attendance</th><th className="p-4">Requested Date</th><th className="p-4">Catering Request</th><th className="p-4">Message Log</th><th className="p-4">Enquiry Status</th></tr></thead><tbody className="divide-y divide-slate-100">{props.enquiries.length === 0 ? <tr><td colSpan={7} className="p-8 text-center text-slate-400">No online conference hall inquiries registered yet.</td></tr> : props.enquiries.map((enquiry) => <tr key={enquiry.id} className="hover:bg-slate-50/55 transition-colors"><td className="p-4 font-bold text-slate-950">{enquiry.name}</td><td className="p-4">{enquiry.organization}</td><td className="p-4"><span className="font-bold text-slate-800 block">{enquiry.eventType}</span><span className="text-slate-400 text-[10px]">{enquiry.estimatedAttendance} guests</span></td><td className="p-4">{new Date(enquiry.date).toLocaleDateString()}</td><td className="p-4 font-bold text-slate-700">{enquiry.cateringRequirement ? "✓ Catering requested" : "✕ Room only"}</td><td className="p-4 max-w-xs truncate text-slate-500" title={enquiry.message}>{enquiry.message}</td><td className="p-4"><button onClick={() => props.onToggleEnquiryStatus(enquiry.id, enquiry.status)} className={`px-3 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${enquiry.status === "RESPONDED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"}`}>{enquiry.status}</button></td></tr>)}</tbody></table></div></div></div>;
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"><span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">{label}</span><span className="text-2xl font-extrabold text-slate-950 block">{value}</span><span className="text-[10px] font-mono text-slate-500 block mt-1">{note}</span></div>;
}

export default function BackOfficeView() {
  const dispatch = useDispatch();
  const portal = useBackOfficePortal();
  const isOwner = portal.user?.role === "OWNER";

  if (!portal.isAuthenticated) {
    return (
      <AdminLoginSection
        isSignUp={portal.isSignUp}
        loginLoading={portal.loginLoading}
        loginError={portal.loginError}
        signUpError={portal.signUpError}
        signUpSuccess={portal.signUpSuccess}
        email={portal.email}
        password={portal.password}
        signUpEmail={portal.signUpEmail}
        signUpName={portal.signUpName}
        signUpPassword={portal.signUpPassword}
        onToggleMode={portal.setIsSignUp}
        onEmailChange={portal.setEmail}
        onPasswordChange={portal.setPassword}
        onSignUpEmailChange={portal.setSignUpEmail}
        onSignUpNameChange={portal.setSignUpName}
        onSignUpPasswordChange={portal.setSignUpPassword}
        onSubmitLogin={portal.handleLogin}
        onSubmitSignUp={portal.handleSignUp}
      />
    );
  }

  if (portal.user?.role === "USER") {
    return (
      <GuestDashboard
        userName={portal.user.name}
        bookings={portal.myBookings}
        loading={portal.myLoading}
        receiptInput={portal.receiptInput}
        onBookAnotherRoom={() => dispatch(setTab("BOOK_NOW"))}
        onBackToHome={() => dispatch(setTab("HOME"))}
        onLogout={portal.handleLogout}
        onReceiptInputChange={(bookingId, value) => portal.setReceiptInput((prev) => ({ ...prev, [bookingId]: value }))}
        onSubmitReceipt={portal.handleUploadReceipt}
        onCancelBooking={portal.handleCancelMyBooking}
        onUpdateBooking={portal.handleUpdateBooking}
      />
    );
  }

  return (
    <BackOfficeSection
      userName={portal.user?.name || ""}
      userRole={portal.user?.role || ""}
      isOwner={isOwner}
      currentTab={portal.adminTab}
      adminTab={portal.adminTab}
      reservations={portal.admin.reservations}
      auditLogs={portal.admin.auditLogs}
      stats={portal.admin.stats}
      monthlyReports={portal.admin.monthlyReports}
      staff={portal.admin.staff}
      rooms={portal.admin.rooms}
      enquiries={portal.admin.enquiries}
      searchTerm={portal.searchTerm}
      statusFilter={portal.statusFilter}
      paymentFilter={portal.paymentFilter}
      editingRoomTypeId={portal.editingRoomTypeId}
      editingRate={portal.editingRate}
      editingDescription={portal.editingDescription}
      newStaffEmail={portal.newStaffEmail}
      newStaffName={portal.newStaffName}
      newStaffPassword={portal.newStaffPassword}
      newStaffRole={portal.newStaffRole}
      staffError={portal.staffError}
      staffSuccess={portal.staffSuccess}
      loading={portal.admin.loading}
      error={portal.admin.error}
      onGoToWebsite={() => dispatch(setTab("HOME"))}
      onLogout={portal.handleLogout}
      onSetAdminTab={(tab) => dispatch(setAdminTab(tab))}
      onSearchTermChange={portal.setSearchTerm}
      onStatusFilterChange={portal.setStatusFilter}
      onPaymentFilterChange={portal.setPaymentFilter}
      onStatusChange={portal.handleStatusChange}
      onTogglePayment={portal.handleTogglePayment}
      onCancelReservation={portal.handleCancelReservation}
      onDeleteReservation={portal.handleDeleteReservation}
      onCreateStaffSubmit={portal.handleCreateStaffSubmit}
      onNewStaffEmailChange={portal.setNewStaffEmail}
      onNewStaffNameChange={portal.setNewStaffName}
      onNewStaffPasswordChange={portal.setNewStaffPassword}
      onNewStaffRoleChange={portal.setNewStaffRole}
      onToggleStaffStatus={portal.handleToggleStaffStatus}
      onDeleteStaff={portal.handleDeleteStaff}
      onToggleRoomMaintenance={portal.handleToggleRoomMaintenance}
      onEditRoomType={(roomTypeId, rate, description) => {
        portal.setEditingRoomTypeId(roomTypeId);
        portal.setEditingRate(rate);
        portal.setEditingDescription(description);
      }}
      onSaveRoomRate={portal.handleUpdateRoomRate}
      onCancelRoomEdit={() => portal.setEditingRoomTypeId(null)}
      onEditingRateChange={portal.setEditingRate}
      onEditingDescriptionChange={portal.setEditingDescription}
      onToggleEnquiryStatus={portal.handleToggleEnquiryStatus}
    />
  );
}
